export function Footer() {
    return (
        <footer className="footer" id="contacts">
            <div className="footer__container container">
                <div className="leftDiv">
                    <div className="address-item-container _anim-on-scroll">
                        <div className="address-item address-item--gh">
                            <a href="https://github.com/esukhova" target="_blank" rel="noopener">
                                <img src="./images/github.svg" alt="GitHub" title="github"/>
                            </a>
                        </div>
                        <div className="address-item address-item--mail">
                            <a href="mailto:e_ukhova@inbox.ru?subject=Отклик%20на%20резюме&body=Здравствуйте!%20Нам%20очень%20понравилось%20ваше%20портфолио!">
                                <img src="./images/mail.svg" alt="Электронная почта" title="email"/>
                            </a>
                        </div>
                        <div className="address-item address-item--vk">
                            <a href="https://vk.com/hi_and_goodbye" target="_blank" rel="noopener">
                                <img src="./images/vk.svg" alt="ВКонтакте" title="vk"/>
                            </a>
                        </div>
                        <div className="address-item address-item--tg">
                            <a href="https://t.me/kate_ukhova" target="_blank" rel="noopener">
                                <img src="./images/tg.svg" alt="Телеграмм" title="тг"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="rightDiv">
                    <p className="footer__text _anim-on-scroll">Для связи со мной пишите
                        <span> на почту <a href="mailto:e_ukhova@inbox.ru?subject=Отклик%20на%20резюме&body=Здравствуйте!%20Нам%20очень%20понравилось%20ваше%20портфолио!">e_ukhova@inbox.ru</a></span>
                        <span> и в <a href="https://t.me/kate_ukhova" target="_blank" rel="noopener">телеграмм</a></span>
                    </p>
                </div>
            </div>
        </footer>
    )
}