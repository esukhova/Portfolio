import {getProjects} from "@/utils/projects";
import {VanillaCard} from "@/components/VanillaCard/VanillaCard";
import {STATS_KEYS} from "@/types/Project.type";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Autoplay} from "swiper/modules";
import {asset} from "@/utils/asset";

export function Vanilla() {

    return (
        <section className="vanilla" id="vanilla">
            <div className="vanilla__container container _anim-on-scroll">
                <h2 className="vanilla__title title title--type_h2 flicker-1">
                    <span className="flicker-3">V</span>
                    <span>anil</span>
                    <span className="flicker-2">la </span>
                    <span>проекты</span>
                </h2>
                <div className="vanilla__swiper-outer swiper-outer">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        className="vanilla__swiper swiper"
                        slidesPerView={1.5}
                        spaceBetween={0}
                        loop={false}
                        autoplay={false}
                        pagination={{
                            el: '.vanilla .pagination',
                            type: 'bullets',
                            clickable: true,
                        }}
                        navigation={{
                            nextEl: '.vanilla .button-next',
                            prevEl: '.vanilla .button-prev',
                        }}
                        breakpoints={{
                            500: {
                                slidesPerView: 2,
                            },
                            700: {
                                slidesPerView: 3,
                            },
                            1000: {
                                slidesPerView: 4,
                            },
                            1400: {
                                slidesPerView: 5,
                            },
                            1600: {
                                slidesPerView: 6,
                            },
                            2200: {
                                slidesPerView: 7,
                                spaceBetween: 20,
                            }
                        }}>
                        {getProjects('vanilla').map(v => (
                            <SwiperSlide key={v.id} className="swiper__slide">
                                <VanillaCard vanilla={v}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <button className="vanilla__swiper-button-prev swiper__button-prev button-prev icon-wrapper"
                            aria-label="Предыдущий слайд">
                        <img src={asset('images/vanilla-arrow.svg')} width='100' height='100'/>
                    </button>
                    <button className="vanilla__swiper-button-next swiper__button-next button-next icon-wrapper"
                            aria-label="Следующий слайд">
                        <img src={asset('images/vanilla-arrow.svg')} width='100' height='100'/>
                    </button>
                </div>
                <ul className="vanilla__statslist statslist">
                    {STATS_KEYS.map((s) => (
                        <li key={s} data-lang={s} className="statslist__item">{s}</li>
                    ))}
                </ul>
            </div>
        </section>
    )
}