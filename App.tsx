import React, { useState, useEffect, useRef } from 'react';
import PlantCard from './components/PlantCard';
import { plantsData } from './data/plantsData';
import './App.css';

function App() {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);

    const ITEMS_PER_PAGE = 4;
    const MOBILE_ITEMS_PER_PAGE = 1;
    const itemsPerPage = isMobile ? MOBILE_ITEMS_PER_PAGE : ITEMS_PER_PAGE;
    const totalPages = Math.ceil(plantsData.length / itemsPerPage);

    useEffect(() => {
        const checkScreenSize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            mobile ? setCurrentCardIndex(0) : setCurrentPage(1);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const getVisiblePlants = () => {
        return isMobile
            ? plantsData
            : plantsData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    };

    const scrollCarousel = (direction: 'prev' | 'next') => {
        if (!carouselRef.current) return;

        const card = carouselRef.current.querySelector('.plant-card') as HTMLElement;
        if (!card) return;

        const cardWidth = card.offsetWidth + 20;
        carouselRef.current.scrollBy({ left: direction === 'next' ? cardWidth : -cardWidth, behavior: 'smooth' });

        setCurrentCardIndex(prev => {
            const newIndex = direction === 'next' ? prev + 1 : prev - 1;
            return Math.max(0, Math.min(plantsData.length - 1, newIndex));
        });
    };

    const changePage = (direction: 'prev' | 'next') => {
        setCurrentPage(prev => Math.max(1, Math.min(totalPages, direction === 'next' ? prev + 1 : prev - 1)));
    };

    const mobileCurrentPage = Math.floor(currentCardIndex / MOBILE_ITEMS_PER_PAGE) + 1;

    return (
        <div className="app">
            <header className="header">
                <div className="logo"><a href="/">F&B</a></div>
                <nav className="navigation">
                    {['Каталог', 'Галерея', 'О лаборатории', 'Контакты'].map((item) => (
                        <a key={item} href={`/${item.toLowerCase()}`}>{item}</a>
                    ))}
                </nav>
                <div className="controls">
                    <a href="/search" aria-label="Поиск">🔍</a>
                    <a href="/exit" aria-label="Выход">↗</a>
                </div>
            </header>

            <main>
                <section className="hero">
                    <h1>Крупнейшая коллекция природных артефактов</h1>
                    <p>Являясь всего лишь частью общей картины, интерактивные прототипы, которые представляют собой яркий пример европейского типа политической и социальной культуры.</p>
                    <button>Исследовать</button>
                </section>

                <section className="collections">
                    <div className="plants-section">
                        <div className="plants-container">

                            <div ref={carouselRef} className={`plants-grid ${isMobile ? 'plants-grid--mobile' : ''}`}>
                                {getVisiblePlants().map(plant => (
                                    <PlantCard key={plant.id} plant={plant} />
                                ))}
                            </div>

                            {isMobile && (
                                <div className="mobile-pagination">
                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <button
                                            key={i}
                                            className={`mobile-pagination__dot ${mobileCurrentPage === i + 1 ? 'mobile-pagination__dot--active' : ''}`}
                                            onClick={() => {
                                                setCurrentCardIndex(i * MOBILE_ITEMS_PER_PAGE);
                                                const card = carouselRef.current?.querySelector('.plant-card') as HTMLElement;
                                                if (carouselRef.current && card) {
                                                    carouselRef.current.scrollTo({
                                                        left: i * (card.offsetWidth + 20),
                                                        behavior: 'smooth'
                                                    });
                                                }
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                            {['left', 'right'].map((dir) => {
                                const isLeft = dir === 'left';
                                const disabled = isMobile
                                    ? (isLeft ? currentCardIndex === 0 : currentCardIndex === plantsData.length - 1)
                                    : (isLeft ? currentPage === 1 : currentPage === totalPages);

                                return (
                                    <button
                                        key={dir}
                                        className={`carousel-arrow carousel-arrow--${dir} ${isMobile ? 'mobile-arrow' : ''}`}
                                        onClick={() => isMobile ? scrollCarousel(isLeft ? 'prev' : 'next') : changePage(isLeft ? 'prev' : 'next')}
                                        disabled={disabled}
                                    >
                                        {isLeft ? '←' : '→'}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="new-artifacts">
                        <h2 id="new_artifacts">Новые артефакты</h2>
                        <div className="herbarium-container">
                            <div className="herbarium-board">
                                <img
                                    src="https://lh6.googleusercontent.com/jh4lxzKI_VXpGFp8qrAg9tFDzutZal1O6P2l5HDuSmaaZRKvVVrh6VTmrrm1p8ovZvDPfmTncHOOtb_UY026pjDmRge7sspbYWo9iwAbsU2G39dLXbG4uXdcCf8w7qJSArMkIIVTQ1qWS9iuhta4o9M"
                                    alt="Herbarium specimen"
                                    className="herbarium-image"
                                />
                            </div>
                            <div className="info-block">
                                <h3>Kurische Nehrung 24</h3>
                                <p id="herbarium_text">Вот вам яркий пример современных тенденций - начало повседневной работы по формированию позиции выявляет срочную потребность методов управления процессами. Есть над чем задуматься: представители современных социальных резервов своевременно верифицированы.</p>
                                <button className="read-more-btn">
                                    Читать далее →
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="support">
                    <h2>Помочь проекту</h2>
                    <p>Равным образом, экономическая повестка сегодняшнего дня не даёт нам иного выбора, кроме определения прогресса профессионального сообщества.</p>
                    <form>
                        <input type="text" placeholder="Имя" required />
                        <input type="email" placeholder="Email" required />
                        <button type="submit">Отправить</button>
                    </form>
                </section>
            </main>

            <footer className="footer">
                <div className="social-links">
                    {['youtube', 'instagram', 'facebook', 'twitter'].map((social) => (
                        <a
                            key={social}
                            href={`https://${social}.com`}
                            aria-label={social}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="10" />
                            </svg>
                        </a>
                    ))}
                </div>
            </footer>

            <div className="copyright">
                <p>f&b ® 2020</p>
            </div>
        </div>
    );
}

export default App;