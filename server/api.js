import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, '../src/data/jobs.json');

// 👈 لازم نحدد المسار بالضبط جنب api.js، وإلا dotenv بيدوّر بمجلد التشغيل (cwd)
// يلي ممكن يكون مختلف عن مكان الملف نفسه → القيم بتطلع undefined وتسجيل دخول الأدمن يفشل
dotenv.config({ path: join(__dirname, '.env') });

// 👈 قيم احتياطية (fallback) — لو .env ما انقرا لأي سبب، تسجيل دخول الأدمن بيضل شغال
// بالقيم الافتراضية، وبنفس الوقت أي قيمة موجودة فعلياً بـ .env بتاخد الأولوية دايماً
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@platform.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '123456';

if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
  console.warn('⚠️  تحذير: ملف .env غير موجود أو غير مقروء — تم استخدام بيانات الأدمن الافتراضية مؤقتاً.');
} else {
  console.log('✅ تم تحميل بيانات الأدمن من ملف .env بنجاح.');
}

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: '15mb' })); // 👈 كانت 100kb افتراضياً - صور الهوية والأعمال بصيغة base64 بتتجاوزها بسهولة → 413

// ── helper: قراءة وكتابة الـ DB ──────────────────────────────────
const readDB = () => JSON.parse(readFileSync(DB_PATH, 'utf-8'));
const writeDB = (data) => writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');

// ════════════════════════════════════════════════════════════════
// 1. CATEGORIES  GET /api/categories
// ════════════════════════════════════════════════════════════════
app.get('/api/categories', (_req, res) => {
  const { categories } = readDB();
  res.json(categories);
});

// ════════════════════════════════════════════════════════════════
// 2. SITE META  GET /api/site  (stats, features, quickSearchTags)
// ════════════════════════════════════════════════════════════════
app.get('/api/site', (_req, res) => {
  const { stats, features, quickSearchTags } = readDB();
  res.json({ stats, features, quickSearchTags });
});

// ════════════════════════════════════════════════════════════════
// 3. WORKERS
// ════════════════════════════════════════════════════════════════

// GET /api/workers  — جلب كل الفنيين مع بحث وفلترة واختياري top N
app.get('/api/workers', (req, res) => {
  const { search = '', category = 'الكل', status, top } = req.query;
  let list = readDB().workers;

  if (status) list = list.filter(w => w.status === status);
  if (category !== 'الكل') list = list.filter(w => w.category?.trim() === category.trim());

  if (search.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter(w =>
      w.workerName?.toLowerCase().includes(q) ||
      w.title?.toLowerCase().includes(q) ||
      w.category?.toLowerCase().includes(q) ||
      w.description?.toLowerCase().includes(q)
    );
  }

  if (top) {
    list = [...list]
      .filter(w => (w.reviewsCount || 0) > 0) 
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, parseInt(top));
  }

  res.json(list);
});

app.get('/api/workers/:id', (req, res) => {
  const db = readDB();

  const worker = db.workers.find(
    (w) => String(w.id) === String(req.params.id)
  );

  if (!worker) {
    return res.status(404).json({
      message: 'الفني غير موجود',
    });
  }

  const {
    password,
    ...safeWorker
  } = worker;

  res.json(safeWorker);
});

app.post('/api/workers', (req, res) => {
  const db = readDB();
  const { fullName, category, residence, detailedAddress, phone, email, password, idImage, portfolioImages } = req.body;

  if (!fullName || !email || !password || !category)
    return res.status(400).json({ message: 'بيانات ناقصة' });

  if (db.workers.find(w => w.email === email))
    return res.status(409).json({ message: 'البريد الإلكتروني مسجل مسبقاً' });

  const newWorker = {
    id: Date.now(),
    title: `خدمات - ${category}`,
    description: `فني بمجال ${category} في ${residence || ''}.`,
    category, price: 35,
    workerName: fullName, email, password,
    phone, residence, detailedAddress: detailedAddress || '',
    status: 'pending', rating: 0, 
    portfolioImages: portfolioImages || [],
  };

  db.workers.unshift(newWorker);
  writeDB(db);
  res.status(201).json({ message: 'تم إرسال طلب الانضمام', worker: newWorker });
});

app.patch('/api/workers/:id/delay', (req, res) => {
  const db = readDB();
  const idx = db.workers.findIndex(w => w.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'الفني غير موجود' });

  const worker = db.workers[idx];
  worker.delaysCount = (worker.delaysCount || 0) + 1;

  let autoRemoved = false;
  if (worker.delaysCount >= 3) {
    db.workers.splice(idx, 1);
    autoRemoved = true;
  }

  writeDB(db);
  res.json({
    message: autoRemoved
      ? 'تم تسجيل التأخير - الفني تجاوز 3 تأخيرات وتم فصله تلقائياً من المنصة'
      : `تم تسجيل التأخير (${worker.delaysCount}/3) - خصم ${worker.delaysCount}% من الدفعة`,
    worker: autoRemoved ? null : worker,
    autoRemoved,
  });
});

app.patch('/api/workers/:id/status', (req, res) => {
  const { status } = req.body; 
  const db = readDB();
  const idx = db.workers.findIndex(w => w.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'الفني غير موجود' });

  if (status === 'removed') {
    db.workers.splice(idx, 1);
    writeDB(db);
    return res.json({ message: 'تم إزالة الفني' });
  }

  db.workers[idx].status = status;
  writeDB(db);
  res.json({ message: `تم تحديث حالة الفني إلى ${status}`, worker: db.workers[idx] });
});

app.patch('/api/workers/:id/profile', (req, res) => {
  const db = readDB();
  const idx = db.workers.findIndex(w => w.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'الفني غير موجود' });

  const { phone, detailedAddress } = req.body;
  if (phone !== undefined) db.workers[idx].phone = phone;
  if (detailedAddress !== undefined) db.workers[idx].detailedAddress = detailedAddress;

  writeDB(db);
  const { password: _p, ...safe } = db.workers[idx];
  res.json({ message: 'تم تحديث بياناتك', worker: safe });
});

app.post('/api/workers/login', (req, res) => {
  const { email, password } = req.body;
  const worker = readDB().workers.find(w => w.email === email && w.password === password);
  if (!worker) return res.status(401).json({ message: 'بيانات غير صحيحة' });
  if (worker.status === 'pending') return res.status(403).json({ message: 'حسابك لا يزال قيد المراجعة' });
  if (worker.status === 'rejected') return res.status(403).json({ message: 'تم رفض طلب انضمامك' });
  const { password: _p, idImage: _i, ...safe } = worker;
  res.json({ message: 'تم تسجيل الدخول', worker: safe });
});


app.get('/api/clients', (_req, res) => {
  const db = readDB();
  const clients = (db.clients || []).map(({ password: _p, ...c }) => c);
  res.json(clients);
});

app.post('/api/clients', (req, res) => {
  const db = readDB();
  if (!db.clients) db.clients = [];
  const { fullName, email, password, phone, idNumber, governorate, detailedAddress } = req.body;

  if (!fullName || !email || !password)
    return res.status(400).json({ message: 'بيانات ناقصة' });

  if (db.clients.find(c => c.email === email))
    return res.status(409).json({ message: 'البريد الإلكتروني مسجل مسبقاً' });

  const newClient = {
    id: Date.now(), fullName, email, password,
    phone, idNumber, governorate: governorate || '', detailedAddress: detailedAddress || '',
    registeredAt: new Date().toLocaleDateString('ar-EG'),
  };

  db.clients.unshift(newClient);
  writeDB(db);
  const { password: _p, ...safe } = newClient;
  res.status(201).json({ message: 'تم إنشاء الحساب', client: safe });
});

app.patch('/api/clients/:id/profile', (req, res) => {
  const db = readDB();
  const idx = (db.clients || []).findIndex(c => c.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'الزبون غير موجود' });

  const { phone, detailedAddress } = req.body;
  if (phone !== undefined) db.clients[idx].phone = phone;
  if (detailedAddress !== undefined) db.clients[idx].detailedAddress = detailedAddress;

  writeDB(db);
  const { password: _p, ...safe } = db.clients[idx];
  res.json({ message: 'تم تحديث بياناتك', client: safe });
});

app.post('/api/clients/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDB();
  const client = (db.clients || []).find(c => c.email === email && c.password === password);
  if (!client) return res.status(401).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
  const { password: _p, ...safe } = client;
  res.json({ message: 'تم تسجيل الدخول', client: safe });
});

app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  console.log('[ADMIN LOGIN ATTEMPT]');
  console.log('  المرسَل من الفورم   →', JSON.stringify(email), '/', JSON.stringify(password));
  console.log('  المتوقع بالسيرفر    →', JSON.stringify(ADMIN_EMAIL), '/', JSON.stringify(ADMIN_PASSWORD));
  console.log('  متطابق؟             →', email === ADMIN_EMAIL && password === ADMIN_PASSWORD);

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD)
    return res.json({ message: 'تم تسجيل دخول المسؤول', role: 'admin', name: 'مدير المنصة' });
  res.status(401).json({ message: 'بيانات المسؤول غير صحيحة' });
});


app.get('/api/projects', (req, res) => {
  const db = readDB();
  let list = db.projects || [];
  if (req.query.clientName) list = list.filter(p => p.clientName === req.query.clientName);
  if (req.query.workerName) list = list.filter(p => p.assignedWorker === req.query.workerName);
  res.json(list);
});

app.post('/api/projects', (req, res) => {
  const db = readDB();
  if (!db.projects) db.projects = [];
  const { clientName, clientPhone, title, category, details, budget, estimatedDays } = req.body;

  if (!clientName || !title) return res.status(400).json({ message: 'بيانات ناقصة' });

  const newProject = {
    id: Date.now(),
    clientName, clientPhone: clientPhone || '',
    title, category, details,
    budget: Number(budget) || 50,
    assignedWorker: req.body.assignedWorker || 'بانتظار التعيين',
    assignedWorkerId: null,
    workerChoice: req.body.workerChoice || 'platform',
    statusStep: req.body.assignedWorker && req.body.assignedWorker !== 'بانتظار التعيين' ? 2 : 1,
    isDelayed: false,
    createdAt: new Date().toISOString().split('T')[0],
    estimatedDays: Number(estimatedDays) || 2,
    startedAt: req.body.assignedWorker && req.body.assignedWorker !== 'بانتظار التعيين'
      ? new Date().toISOString().split('T')[0] : null,
  };

  db.projects.unshift(newProject);
  writeDB(db);
  res.status(201).json({ message: 'تم إضافة المشروع', project: newProject });
});

app.patch('/api/projects/:id/assign', (req, res) => {
  const { workerName } = req.body;
  const db = readDB();
  const idx = (db.projects || []).findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'المشروع غير موجود' });

  db.projects[idx].assignedWorker = workerName;
  db.projects[idx].statusStep = 2;
  db.projects[idx].startedAt = new Date().toISOString().split('T')[0];
  writeDB(db);
  res.json({ message: 'تم تعيين الفني', project: db.projects[idx] });
});

app.patch('/api/projects/:id/advance', (req, res) => {
  const db = readDB();
  const idx = (db.projects || []).findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'المشروع غير موجود' });
  
  if (db.projects[idx].statusStep >= 5) return res.status(400).json({ message: 'المشروع مكتمل' });

  db.projects[idx].statusStep += 1;
  writeDB(db);
  res.json({ message: 'تم تقدم المرحلة', project: db.projects[idx] });
});

app.patch('/api/clients/:id/block', (req, res) => {
  const db = readDB();
  if (!db.clients) db.clients = [];
  const idx = db.clients.findIndex(c => c.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'الزبون غير موجود' });

  db.clients[idx].isBlocked = !db.clients[idx].isBlocked;
  writeDB(db);
  const { password: _p, ...safe } = db.clients[idx];
  res.json({ message: db.clients[idx].isBlocked ? 'تم حظر الحساب' : 'تم إلغاء الحظر', client: safe });
});
app.delete('/api/clients/:id', (req, res) => {
  const db = readDB();
  const idx = (db.clients || []).findIndex(c => c.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'الزبون غير موجود' });
  db.clients.splice(idx, 1);
  writeDB(db);
  res.json({ message: 'تم حذف الحساب' });
});

app.patch('/api/projects/:id/cancel', (req, res) => {
  const db = readDB();
  const idx = (db.projects || []).findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'المشروع غير موجود' });

  const { reason = '' } = req.body;
  db.projects[idx].statusStep = 0;
  db.projects[idx].cancelledAt = new Date().toISOString().split('T')[0];
  db.projects[idx].cancelReason = reason;
  writeDB(db);
  res.json({ message: 'تم إلغاء المشروع', project: db.projects[idx] });
});

app.get('/api/reviews/:workerId', (req, res) => {
  const db = readDB();
  const workerId = parseInt(req.params.workerId);
  const reviews = (db.reviews || []).filter(r => r.workerId === workerId);
  res.json(reviews);
});

app.post('/api/reviews/:workerId', (req, res) => {
  const workerId = parseInt(req.params.workerId);
  const { clientName, clientEmail, stars, comment } = req.body;

  if (!clientName || !stars) return res.status(400).json({ message: 'بيانات ناقصة' });
  if (stars < 1 || stars > 5) return res.status(400).json({ message: 'التقييم يجب أن يكون بين 1 و5' });

  const db = readDB();
  if (!db.reviews) db.reviews = [];

  const already = db.reviews.find(r => r.workerId === workerId && r.clientEmail === clientEmail);
  if (already) return res.status(409).json({ message: 'لقد قمت بتقييم هذا الفني مسبقاً' });

  const review = {
    id: Date.now(),
    workerId,
    clientName,
    clientEmail: clientEmail || '',
    stars: Number(stars),
    comment: comment || '',
    date: new Date().toLocaleDateString('ar-EG'),
  };

  db.reviews.unshift(review);

  const widx = db.workers.findIndex(w => w.id === workerId);
  if (widx !== -1) {
    const allWorkerReviews = db.reviews.filter(r => r.workerId === workerId);
    const avg = allWorkerReviews.reduce((s, r) => s + r.stars, 0) / allWorkerReviews.length;
    db.workers[widx].rating = parseFloat(avg.toFixed(1));
    db.workers[widx].reviewsCount = allWorkerReviews.length;
  }

  writeDB(db);
  res.status(201).json({ message: 'تم إضافة التقييم', review });
});

app.listen(PORT, () => {
  console.log(`✅ API Server running → http://localhost:${PORT}`);
  console.log('   GET  /api/categories');
  console.log('   GET  /api/site');
  console.log('   GET  /api/workers  ?search=&category=&status=&top=');
  console.log('   GET  /api/workers/:id');
  console.log('   POST /api/workers');
  console.log('   POST /api/workers/login');
  console.log('   PATCH /api/workers/:id/status');
  console.log('   PATCH /api/workers/:id/delay');
  console.log('   PATCH /api/workers/:id/profile');
  console.log('   GET  /api/clients');
  console.log('   POST /api/clients');
  console.log('   POST /api/clients/login');
  console.log('   PATCH /api/clients/:id/profile');
  console.log('   POST /api/admin/login');
  console.log('   GET  /api/projects  ?clientName=&workerName=');
  console.log('   POST /api/projects');
  console.log('   PATCH /api/projects/:id/assign');
  console.log('   PATCH /api/projects/:id/advance');
  console.log('   GET  /api/warnings');
  console.log('   POST /api/warnings');
  console.log('   GET  /api/reviews/:workerId');
  console.log('   POST /api/reviews/:workerId');
});