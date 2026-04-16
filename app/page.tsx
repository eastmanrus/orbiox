"use client";

import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Theme = "dark" | "light";

type Module = {
  name: string;
  title: string;
  text: string;
  result: string;
};

const nav = [
  ["Проблема", "#problem"],
  ["Модули", "#modules"],
  ["Контур", "#flow"],
  ["Роли", "#roles"],
  ["FAQ", "#faq"],
];

const problems = [
  ["Разрозненные данные", "Медосмотр, выпуск, инструктажи, статусы техники и отчеты живут в разных источниках."],
  ["Ручной выпуск", "Критически важные решения принимаются по телефону, в мессенджере или по памяти."],
  ["Нет сквозного контроля", "Невозможно быстро увидеть, почему водитель или ТС допущены либо заблокированы."],
  ["Сложная отчетность", "На подготовку отчетов уходит время, а данные не всегда совпадают."],
];

const modules: Module[] = [
  { name: "OrbiMed", title: "Контроль медосмотра", text: "Учет предрейсовых и послерейсовых осмотров, группы риска, статусы допуска и контроль просрочек.", result: "Исключает выпуск без подтвержденного медконтроля." },
  { name: "OrbiGate", title: "Выпуск на линию", text: "Проверка связки водитель, медосмотр, ТС и обязательные условия перед выпуском.", result: "Выпуск становится управляемым процессом." },
  { name: "OrbiUnit", title: "Транспортные средства", text: "Реестр транспорта, карточка ТС, история, события, обслуживание и привязка к водителю.", result: "Техника рассматривается как объект контроля." },
  { name: "OrbiCore", title: "Управление водителями", text: "Карточка водителя, медицинский статус, инструктажи, стажировка, дисциплина и допуск.", result: "По каждому водителю виден актуальный статус." },
  { name: "OrbiControl", title: "Нарушения", text: "Контролирует соблюдение ПДД, выявляет рискованное поведение водителей и помогает предотвращать нарушения до их последствий.", result: "Зоны риска видны раньше инцидентов." },
  { name: "OrbiLex", title: "Нормативная база", text: "Единое пространство для требований, регламентов, инструкций и локальных актов.", result: "Нормативная база входит в операционный контур." },
  { name: "OrbiSense", title: "Инструктажи и проверки", text: "Организует и фиксирует инструктажи, учебно-тренировочные мероприятия, проверки на линии и обследования дорожных условий, обеспечивая контроль выполнения требований БДД.", result: "Все отчеты под рукой в один клик." },
  { name: "OrbiCheck", title: "Контроль компетенций", text: "Контур обучения, тестирования и аудитов, обеспечивающий подтверждение компетенций персонала и контроль соблюдения требований БДД.", result: "Система обучения и объективной оценки знаний." },
  { name: "OrbiStat", title: "Отчеты и аналитика", text: "Отчеты по водителям, ТС, подразделениям, подрядчикам, допускам и блокировкам.", result: "Руководитель получает готовую картину." },
];

const flow = [
  ["01", "Водитель проходит контроль", "OrbiMed фиксирует актуальный статус медосмотра."],
  ["02", "Карточка дополняется условиями", "OrbiCore показывает обязательные условия допуска."],
  ["03", "ТС получает актуальный статус", "OrbiUnit хранит историю, связи, обслуживание и события."],
  ["04", "Решение о выпуске", "OrbiGate применяет заданную логику допуска."],
  ["05", "События фиксируются", "OrbiControl сохраняет нарушения и проблемные зоны."],
  ["06", "Отчет готовится автоматически", "OrbiStat собирает управленческую картину."],
];

const roles = [
  ["Специалист по БДД", "Единый контур контроля, меньше ручной сверки, понятное основание для решений."],
  ["Диспетчер", "Быстрый ответ: можно выпускать или нет, меньше звонков и зависимости от памяти."],
  ["Руководитель", "Прозрачная картина по рискам, подразделениям, подрядчикам и зонам ответственности."],
  ["Производственная безопасность", "Видимость нарушений и возможность выявлять системные причины."],
];

const kpis = [
  [38, "%", "меньше времени на выпуск"],
  [1, "", "единый источник данных"],
  [24, "/7", "прозрачная история действий"],
  [6, "x", "быстрее подготовка сводок"],
];

const faqs = [
  ["Кому подходит система?", "Всем. Orbiox масштабируется от малого предприятия до распределенной структуры с несколькими площадками и подрядчиками."],
  ["Можно ли внедрять платформу поэтапно?", "Да. Внедрение может начинаться с одного критического контура, например с медосмотра и выпуска, а затем расширяться."],
  ["Можно ли адаптировать логику допуска?", "Да. Система строится вокруг вашей управленческой логики допуска и контроля, а не вокруг жесткого шаблона."],
  ["Чем Orbiox отличается от учетной системы?", "Orbiox связывает данные в единый контур принятия решений. Это управление процессом БДД, а не просто хранение записей."],
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1400, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => spring.on("change", (latest) => setDisplay(Math.round(latest))), [spring]);

  return <span ref={ref}>{display}{suffix}</span>;
}

function Button({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" }) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-lg px-5 text-sm font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/60",
        variant === "primary"
          ? "bg-accent text-white shadow-glow hover:-translate-y-0.5 hover:bg-accent/90"
          : "border border-line bg-surface text-ink hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/10"
      )}
    >
      {children}
    </a>
  );
}

function ThemeToggle({ theme, setTheme }: { theme: Theme; setTheme: (theme: Theme) => void }) {
  return (
    <button
      type="button"
      aria-label="Переключить тему"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-surface text-ink transition-colors duration-300 hover:border-accent/50 hover:bg-accent/10"
    >
      <span className="text-lg">{theme === "dark" ? "☀" : "☾"}</span>
    </button>
  );
}

function HeroVisual() {
  return (
    <div className="orbit-panel status-grid relative min-h-[430px] overflow-hidden rounded-lg border border-line p-5 shadow-lift md:min-h-[560px]">
      <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/35 md:h-[440px] md:w-[440px]" />
      <div className="absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal/35 md:h-[310px] md:w-[310px]" />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[2px] w-[46%] origin-left bg-gradient-to-r from-accent via-teal to-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative z-10 flex h-full min-h-[390px] flex-col justify-between md:min-h-[520px]">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-xs text-muted">ORBIOX CONTROL / LIVE</span>
          <span className="rounded-full border border-teal/40 bg-teal/10 px-3 py-1 font-mono text-xs text-teal">допуск активен</span>
        </div>
        <div className="mx-auto grid h-40 w-40 place-items-center rounded-full border border-line bg-bg/80 text-center backdrop-blur md:h-52 md:w-52">
          <div>
            <p className="font-mono text-xs text-muted">контур БДД</p>
            <p className="font-display mt-2 text-3xl font-bold">97%</p>
            <p className="mt-1 text-sm text-muted">условий закрыто</p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {["Медосмотр", "ТС", "Инструктаж"].map((item, index) => (
            <motion.div
              key={item}
              className="rounded-lg border border-line bg-bg/78 p-3 backdrop-blur"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="font-mono text-[11px] text-muted">0{index + 1}</p>
              <p className="mt-1 text-sm font-bold">{item}</p>
              <p className="mt-2 text-xs text-teal">подтверждено</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("orbiox-theme") as Theme | null;
    const initial = stored === "light" || stored === "dark" ? stored : "dark";
    setThemeState(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("orbiox-theme", next);
  };

  const logo = theme === "dark" ? "/assets/orbiox_w_web.png" : "/assets/orbiox_b_web.png";

  return (
    <main className="relative z-10 min-h-screen bg-bg text-ink transition-colors duration-300">
      <header className="sticky top-0 z-50 border-b border-line/80 bg-bg/82 backdrop-blur-xl transition-colors duration-300">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-3" aria-label="Orbiox">
            <Image src={logo} alt="Orbiox" width={132} height={36} priority className="h-9 w-auto" />
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {nav.map(([label, href]) => (
              <a key={href} href={href} className="group relative text-sm font-medium text-muted transition-colors hover:text-ink">
                {label}
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#demo" className="hidden rounded-lg bg-accent px-4 py-2 text-sm font-bold text-white transition hover:bg-accent/90 sm:inline-flex">Демо</a>
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>
      </header>

      <section id="top" className="section-band bg-bg py-12 md:py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="font-mono text-xs font-bold uppercase text-accent">платформа управления безопасностью дорожного движения</p>
            <h1 className="font-display shimmer-text mt-5 max-w-4xl text-balance text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Управляйте БДД в одной системе, а не в десятках таблиц и чатов
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Orbiox объединяет медосмотр, выпуск ТС на линию, контроль водителей, инструктажи, нормативную базу и отчетность в единой цифровой экосистеме.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#demo">Запросить демо</Button>
              <Button href="#modules" variant="secondary">Посмотреть модули</Button>
            </div>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
              Для служб БДД, транспортных подразделений, производственной безопасности, диспетчерских центров, подрядчиков и руководителей автопарков.
            </p>
          </Reveal>
          <Reveal delay={0.1}><HeroVisual /></Reveal>
        </div>
      </section>

      <section className="section-band bg-surface py-12 md:py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="font-mono text-xs font-bold uppercase text-teal">точка сбоя</p>
              <h2 className="font-display mt-4 text-3xl font-bold leading-tight md:text-5xl">Excel, мессенджеры и ручная сверка не держат контур риска</h2>
            </div>
            <div className="border-l border-line pl-6 text-lg leading-relaxed text-muted">
              Каждый день специалисты тратят время не на управление рисками, а на поиск статусов: допущен ли водитель, пройден ли медосмотр, можно ли выпускать ТС и где актуальные требования.
            </div>
          </Reveal>
        </div>
      </section>

      <section id="problem" className="section-band bg-bg py-12 md:py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="max-w-3xl">
            <p className="font-mono text-xs font-bold uppercase text-accent">проблема → решение</p>
            <h2 className="font-display mt-4 text-3xl font-bold leading-tight md:text-5xl">Почему традиционный контур БДД перестает работать</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {problems.map(([title, text], index) => (
              <Reveal key={title} delay={index * 0.04}>
                <motion.article whileHover={{ y: -2 }} className="h-full rounded-lg border border-line bg-surface p-5 transition-shadow hover:shadow-lift">
                  <span className="font-mono text-xs text-accent">0{index + 1}</span>
                  <h3 className="font-display mt-5 text-xl font-bold">{title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{text}</p>
                </motion.article>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 rounded-lg border border-line bg-surface p-6 md:p-8">
            <h3 className="font-display text-2xl font-bold">Что делает Orbiox</h3>
            <p className="mt-4 max-w-4xl text-lg leading-relaxed text-muted">
              Создает единый цифровой контур: проверяет условия допуска, связывает водителя, ТС и процедуру выпуска, фиксирует события, блокирует рискованные ситуации и формирует отчеты для руководства.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-band bg-surface py-12 md:py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <p className="font-mono text-xs font-bold uppercase text-teal">ключевой результат</p>
            <h2 className="font-display mt-4 text-3xl font-bold leading-tight md:text-5xl">Не просто учитывать БДД, а управлять ей</h2>
          </Reveal>
          <div className="grid items-stretch gap-4 md:grid-cols-2">
            <Reveal className="h-full">
              <motion.div whileHover={{ y: -2 }} className="flex h-full flex-col rounded-lg border border-line bg-bg p-6 transition-shadow hover:shadow-lift">
                <h3 className="font-display text-xl font-bold">До внедрения</h3>
                <ul className="mt-5 flex-1 space-y-3 text-muted">
                  {['ручная проверка допуска', 'риск пропуска обязательной процедуры', 'запаздывающая реакция', 'отчеты собираются вручную'].map((item) => <li key={item}>— {item}</li>)}
                </ul>
              </motion.div>
            </Reveal>
            <Reveal className="h-full" delay={0.08}>
              <motion.div whileHover={{ y: -2 }} className="flex h-full flex-col rounded-lg border border-teal/40 bg-teal/10 p-6 transition-shadow hover:shadow-lift">
                <h3 className="font-display text-xl font-bold">После внедрения</h3>
                <ul className="mt-5 flex-1 space-y-3 text-muted">
                  {['единые правила выпуска', 'водители и ТС в одном контуре', 'отклонения видны сразу', 'история прозрачна для анализа'].map((item) => <li key={item}>— {item}</li>)}
                </ul>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="modules" className="section-band bg-bg py-12 md:py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-bold uppercase text-accent">экосистема</p>
            <h2 className="font-display mt-4 text-3xl font-bold leading-tight md:text-5xl">Модули, которые работают как единая система</h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((item, index) => (
              <Reveal key={item.name} delay={(index % 3) * 0.04}>
                <motion.article whileHover={{ y: -2 }} className="h-full rounded-lg border border-line bg-surface p-5 transition-shadow hover:shadow-lift">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-xl font-bold">{item.name}</h3>
                    <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="mt-3 font-bold text-accent">{item.title}</p>
                  <p className="mt-4 leading-relaxed text-muted">{item.text}</p>
                  <p className="mt-5 border-t border-line pt-4 text-sm font-bold text-ink">{item.result}</p>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="flow" className="section-band bg-surface py-12 md:py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <p className="font-mono text-xs font-bold uppercase text-teal">как это работает</p>
              <h2 className="font-display mt-4 text-3xl font-bold leading-tight md:text-5xl">От допуска до отчетности — единый цифровой контур</h2>
              <div className="mt-8"><Button href="#demo">Обсудить контур</Button></div>
            </div>
            <div className="space-y-3">
              {flow.map(([num, title, text]) => (
                <motion.div key={num} whileHover={{ x: 4 }} className="grid grid-cols-[56px_1fr] gap-4 rounded-lg border border-line bg-bg p-4">
                  <span className="font-mono text-sm font-bold text-accent">{num}</span>
                  <div>
                    <h3 className="font-display font-bold">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="roles" className="section-band bg-bg py-12 md:py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="max-w-3xl">
            <p className="font-mono text-xs font-bold uppercase text-accent">роли</p>
            <h2 className="font-display mt-4 text-3xl font-bold leading-tight md:text-5xl">Каждая роль видит то, что нужно именно ей</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {roles.map(([title, text], index) => (
              <Reveal key={title} delay={index * 0.04}>
                <motion.article whileHover={{ y: -2 }} className="rounded-lg border border-line bg-surface p-6 transition-shadow hover:shadow-lift">
                  <h3 className="font-display text-xl font-bold">{title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{text}</p>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band bg-surface py-12 md:py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-bold uppercase text-teal">эффект</p>
            <h2 className="font-display mt-4 text-3xl font-bold leading-tight md:text-5xl">Что получает организация после внедрения</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {kpis.map(([value, suffix, label], index) => (
              <Reveal key={label as string} delay={index * 0.04}>
                <div className="rounded-lg border border-line bg-bg p-6 text-center">
                  <p className="font-display text-4xl font-bold text-accent"><Counter value={value as number} suffix={suffix as string} /></p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band bg-bg py-12 md:py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="font-mono text-xs font-bold uppercase text-accent">интеграции и контроль</p>
            <h2 className="font-display mt-4 text-3xl font-bold leading-tight md:text-5xl">Orbiox не ломает процессы, а собирает их в систему</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">Платформа масштабируется по мере зрелости процессов: кадровые данные, медицинские процедуры, учет транспорта, внутренние порталы, BI, уведомления и маршрутизация событий.</p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-lg border border-line bg-surface p-6">
              <h3 className="font-display text-xl font-bold">Данные, доступы и действия под контролем</h3>
              <ul className="mt-5 space-y-3 text-muted">
                {['разграничение ролей и прав доступа', 'история действий пользователей', 'централизованное хранение данных', 'прозрачность решений о допуске', 'единые правила обработки информации'].map((item) => <li key={item}>— {item}</li>)}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="demo" className="section-band bg-surface py-12 md:py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="rounded-lg border border-line bg-bg p-6 md:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="font-mono text-xs font-bold uppercase text-teal">демонстрация</p>
                <h2 className="font-display mt-4 text-3xl font-bold leading-tight md:text-5xl">Готовы перейти от ручного контроля к цифровому управлению БДД?</h2>
                <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">Покажем, как Orbiox может работать под ваши роли, транспортный контур, правила допуска и отчетность.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button href="mailto:bddonline@yandex.ru">Запросить демонстрацию</Button>
                <Button href="tel:+79210906969" variant="secondary">Получить консультацию</Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="faq" className="section-band bg-bg py-12 md:py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal className="text-center">
            <p className="font-mono text-xs font-bold uppercase text-accent">FAQ</p>
            <h2 className="font-display mt-4 text-3xl font-bold md:text-5xl">Вопросы перед внедрением</h2>
          </Reveal>
          <div className="mt-10 space-y-3">
            {faqs.map(([q, a]) => (
              <Reveal key={q}>
                <details className="group rounded-lg border border-line bg-surface p-5 transition-colors open:border-accent/45">
                  <summary className="cursor-pointer list-none font-display text-lg font-bold marker:hidden">{q}</summary>
                  <p className="mt-4 leading-relaxed text-muted">{a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-band bg-surface py-12 md:py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">Orbiox — когда безопасность дорожного движения становится управляемой системой</h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-muted">Переведите БДД в цифровой контур, где каждый допуск, каждая единица транспорта и каждый водитель находятся под контролем.</p>
            <div className="mt-8"><Button href="#demo">Запросить демо</Button></div>
          </Reveal>
        </div>
      </section>

      <footer className="bg-bg py-10">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3">
          <div>
            <Image src={logo} alt="Orbiox" width={132} height={36} className="h-9 w-auto" />
            <p className="mt-4 text-sm leading-relaxed text-muted">Платформа управления безопасностью дорожного движения</p>
          </div>
          <div>
            <p className="font-display font-bold">Модули</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">OrbiMed · OrbiGate · OrbiUnit · OrbiCore · OrbiControl · OrbiLex · OrbiSense · OrbiCheck · OrbiStat</p>
          </div>
          <div>
            <p className="font-display font-bold">Контакты</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">+7 (921) 090-69-69<br />bddonline@yandex.ru<br />orbiox.ru</p>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-6xl px-6 font-mono text-xs text-muted">© Orbiox. Все права защищены.</div>
      </footer>
    </main>
  );
}
