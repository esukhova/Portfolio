import {asset} from "@/utils/asset";

export function Footer() {
    return (
        <footer className="footer" id="contacts">
            <div className="footer__container container">
                <div className="leftDiv">
                    <div className="address__items _anim-on-scroll">
                        <div className="address__item address-item address__item address-item--gh">
                            <a href="https://github.com/esukhova" target="_blank" rel="noopener">
                                <img src={asset('images/github.svg')} width="100" height="100" alt="GitHub"/>
                            </a>
                        </div>
                        <div className="address__item address-item address__item address-item--mail">
                            <a href="mailto:e_ukhova@inbox.ru?subject=Отклик%20на%20резюме&body=Здравствуйте!%20Нам%20очень%20понравилось%20ваше%20портфолио!">
                                <img src={asset('images/mail.svg')} width="64" height="64" alt="Электронная почта"/>
                            </a>
                        </div>
                        <div className="address__item address-item address__item address-item--vk">
                            <a href="https://vk.com/hi_and_goodbye" target="_blank" rel="noopener">
                                <img src={asset('images/vk.svg')} width="24" height="24" alt="ВКонтакте"/>
                            </a>
                        </div>
                        <div className="address__item address-item address__item address-item--tg">
                            <a href="https://t.me/kate_ukhova" target="_blank" rel="noopener">
                                <img src={asset('images/tg.svg')} width="25" height="21" alt="Телеграмм"/>
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