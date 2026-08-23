export function About() {
    return (
        <section id="about" className="about">
            <div className="about__container container">
                <div className="about__text about__text--white _anim-on-scroll">
                    <h3 className="about__text-title">Здравствуйте!</h3>
                    <p>Я — frontend-разработчик из&nbsp;<b>Санкт&#8209;Петербурга</b> с&nbsp;2&nbsp;годами
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
                        <p className="about__text-subtitle">Основной стек: Vue, Angular,
                            JavaScript/TypeScript.</p>
                        <ul className="about__items">
                            <li className="about__item">Vue: разработка компонентов, работа с Vuex, сервисами и
                                сторонними
                                библиотеками
                            </li>
                            <li className="about__item">Angular: разработка интернет-магазинов и сложных
                                пользовательских интерфейсов
                            </li>
                        </ul>
                        <p className="about__text-bottom">Открыта к&nbsp;предложениям по&nbsp;работе с&nbsp;технологиями из&nbsp;моего стека.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}