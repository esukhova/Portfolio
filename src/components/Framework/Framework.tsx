import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {getProjects} from "@/utils/projects";
import {FrameworkCard} from "@/components/FrameworkCard/FrameworkCard";
import {useMediaQuery} from "@/hooks/useMediaQuery";

export function Framework() {

    const isMobile = useMediaQuery('(max-width: 767px)');
    return (
        <section className="framework" id="framework">
            <div className="framework__container container _anim-on-scroll">
                <h2 className="framework__title title title--type_h2 flicker-1">
                    <span className="flicker-3">Fr</span>
                    <span>amew</span>
                    <span className="flicker-2">o</span>
                    <span>rk проекты</span>
                </h2>
                <div className="framework__swiper-outer swiper-outer">
                    <Swiper
                        key={!isMobile ? 'with-default-slides' : 'no-default-slides'}
                        modules={[Navigation, Pagination]}
                        className="framework__swiper swiper"
                        slidesPerView={2}
                        spaceBetween={30}
                        loop={true}
                        pagination={{
                            el: '.framework .pagination',
                            type: 'bullets',
                            clickable: true,
                        }}
                        navigation={{
                            nextEl: '.framework .button-next',
                            prevEl: '.framework .button-prev',
                        }}
                        breakpoints={{
                            500: {
                                slidesPerView: 3,
                            },
                            700: {
                                slidesPerView: 4,
                            },
                            800: {
                                slidesPerView: 5,
                            },
                            900: {
                                slidesPerView: 6,
                            },
                            1400: {
                                slidesPerView: 7,
                            },
                            1700: {
                                slidesPerView: 8,
                            },
                        }}>
                        {getProjects('framework').map(p => (
                            <SwiperSlide key={p.id} className="swiper__slide">
                                <FrameworkCard framework={p} color='yellow'/>
                            </SwiperSlide>
                        ))}
                        {!isMobile && (
                            [1, 2, 3, 1].map((n, i) =>
                                <SwiperSlide key={`${n}-${i}`} className="swiper__slide">
                                    <FrameworkCard default={`default-${n}`}/>
                                </SwiperSlide>
                            )
                        )}
                    </Swiper>
                    <button className="framework__swiper-button-prev swiper__button-prev button-prev"
                            aria-label="Предыдущий слайд">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true">
                            <g data-name="05-Play">
                                <path style={{fill: "#6bdcff"}} d="m17 63 38-31L17 1v62z"/>
                                <path d="M24 34.868V6.711L17 1v62l38-31-19.331 9.977A8 8 0 0 1 24 34.868z"
                                      style={{fill: "#48befd"}}/>
                                <path style={{fill: "#1c69a1"}} d="M13 5v54l4 4V1l-4 4z"/>
                                <path d="M14.2 42.9a3 3 0 0 1-1.2-2.4V59l4 4V41.5a1.75 1.75 0 0 1-2.8 1.4z"
                                      style={{fill: "#15507a"}}/>
                                <path
                                    style={{fill: "none", stroke: "#000", strokeLinejoin: "round", strokeWidth: "2px"}}
                                    d="M17 11V9M23.129 58 17 63V13M17 7V1l38 31-30 24.474M17 1l-4 4v54l4 4"/>
                            </g>
                        </svg>
                    </button>
                    <button className="framework__swiper-button-next swiper__button-next button-next"
                            aria-label="Следующий слайд">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true">
                            <g data-name="05-Play">
                                <path style={{fill: "#6bdcff"}} d="m17 63 38-31L17 1v62z"/>
                                <path d="M24 34.868V6.711L17 1v62l38-31-19.331 9.977A8 8 0 0 1 24 34.868z"
                                      style={{fill: "#48befd"}}/>
                                <path style={{fill: "#1c69a1"}} d="M13 5v54l4 4V1l-4 4z"/>
                                <path d="M14.2 42.9a3 3 0 0 1-1.2-2.4V59l4 4V41.5a1.75 1.75 0 0 1-2.8 1.4z"
                                      style={{fill: "#15507a"}}/>
                                <path
                                    style={{fill: "none", stroke: "#000", strokeLinejoin: "round", strokeWidth: "2px"}}
                                    d="M17 11V9M23.129 58 17 63V13M17 7V1l38 31-30 24.474M17 1l-4 4v54l4 4"/>
                            </g>
                        </svg>
                    </button>
                    <div className="framework__swiper-pagination swiper__pagination pagination"></div>
                </div>
            </div>
        </section>
    )
}