import {stackAngular, stackVue} from "@/data/stack";

export function Stack() {
    const params = new URLSearchParams(window.location.search);
    const utmFramework = params.get("utm_fr");
    const stack = utmFramework === 'vue' ? stackVue : stackAngular;

    return (
        <section id="stack" className="stack">
            <div className="stack__container container">
                <div className="leftDiv">
                    <div className="title-wrapper">
                        <div className="title-wrapper-gradient">
                            <div className="gradient">
                                <h2 className="stack__title title title--type_h3 gradient-text">Мой стек</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="rightDiv _anim-on-scroll">
                    {stack.map(item => (
                        <li className="stack__item" key={item}>{item}</li>
                    ))}
                </ul>
            </div>
        </section>
    )
}