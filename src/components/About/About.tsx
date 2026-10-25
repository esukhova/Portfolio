export function About() {
    const params = new URLSearchParams(window.location.search);
    const utmFramework = params.get("utm_fr");

    const frameworkTexts = {
        vue: {
            subtitle1: "Основной стек: Vue",
            subtitle2: "В постоянной работе: Angular, React, JavaScript/TypeScript.",
        },
        angular: {
            subtitle1: "Основной стек: Angular",
            subtitle2: "В постоянной работе: Vue, React, JavaScript/TypeScript.",
        },
    };

    const defaultTexts = frameworkTexts.angular;

    const texts =
        utmFramework && utmFramework in frameworkTexts
            ? frameworkTexts[utmFramework as keyof typeof frameworkTexts]
            : defaultTexts;

    const frameworkItems = [
        {
            key: "angular",
            text: (
                <>
                    Angular: разработка интернет-магазинов и сложных
                    пользовательских интерфейсов
                </>
            ),
        },
        {
            key: "vue",
            text: (
                <>
                    Vue: разработка компонентов, работа с Vuex, сервисами и
                    сторонними библиотеками
                </>
            ),
        },
        {
            key: "react",
            text: <>React: разработка небольших сайтов</>,
        },
    ];

    const sortedFrameworkItems =
        utmFramework === "vue"
            ? [frameworkItems[1], frameworkItems[0], frameworkItems[2]]
            : frameworkItems;


    return (
        <section id="about" className="about">
            <div className="about__container container">
                <div className="about__text about__text--white _anim-on-scroll">
                    <h3 className="about__text-title">Здравствуйте!</h3>
                    <p>Я — frontend-разработчик из&nbsp;<b>Санкт&#8209;Петербурга</b>, имею 2&nbsp;года
                        коммерческого опыта. Разрабатываю быстрые, удобные и&nbsp;поддерживаемые интерфейсы,
                        уделяя внимание качеству кода, производительности и&nbsp;архитектуре проекта.
                    </p>
                    <p>В этом портфолио вы найдете <a href="#stack">мой&nbsp;стек&nbsp;технологий </a> и&nbsp;<a
                        href="#framework">примеры&nbsp;реализованных проектов.</a>
                    </p>
                </div>
            </div>
            <div className="about__container container">
                <div className="leftDiv">
                    <div className="about__text about__text--green _anim-on-scroll">
                        <h3 className="about__text-title">Что я ценю в&nbsp;работе</h3>
                        <ul className="about__items">
                            <li className="about__item">Чистый, поддерживаемый код</li>
                            <li className="about__item">Производительность и&nbsp;удобство интерфейса</li>
                            <li className="about__item">Прозрачная коммуникация в&nbsp;команде</li>
                            <li className="about__item">Возможность решать нетривиальные задачи</li>
                        </ul>
                    </div>
                </div>
                <div className="rightDiv">
                    <div className="about__text about__text--blue _anim-on-scroll">
                        <h3 className="about__text-title">Опыт и&nbsp;экспертиза</h3>
                        <p className="about__text-subtitle">{texts.subtitle1}</p>
                        <p className="about__text-subtitle">{texts.subtitle2}</p>
                        <ul className="about__items">
                            {sortedFrameworkItems.map(item => (
                                <li className="about__item" key={item.key}>
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                        <p className="about__text-bottom">Открыта к&nbsp;коммерческим предложениям!</p>
                    </div>
                </div>
            </div>
        </section>
    )
}