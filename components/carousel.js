import React from 'react'
import AliceCarousel from 'react-alice-carousel';

export default function Carousel() {

    const items = [
        <div className="carousel-item" id="one">
            <div className="row">
                <h2>Denim jackets</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Quis ipsum sus-pendisse ultrices gravida. Risus
                commodo viverra maecenas accumsan lacus vel facilisis. </p>
            </div>
            <div className="offer-card z-depth-5">
                <span>from</span>
                <h1>$29</h1>
                <span>SHOP NOW</span>
            </div>
        </div>
        ,
        <div className="carousel-item" id="two">
            <div className="row">
                <h2>Denim jackets</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Quis ipsum sus-pendisse ultrices gravida. Risus
                commodo viverra maecenas accumsan lacus vel facilisis. </p>
            </div>
            <div className="offer-card z-depth-5">
                <span>from</span>
                <h1>$29</h1>
                <span>SHOP NOW</span>
            </div>
        </div>
        ,
        <div className="carousel-item" id="three">
        </div>
        ,
        <div className="carousel-item" id="four">
        </div>
        ,
        <div className="carousel-item" id="five">
        </div>
        ,
        <div className="carousel-item" id="six">
            <div className="row">
                <h2>Denim's</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Quis ipsum sus-pendisse ultrices gravida. Risus
                commodo viverra maecenas accumsan lacus vel facilisis. </p>
            </div>
            <div className="offer-card z-depth-5">
                <span>from</span>
                <h1>$29</h1>
                <span>SHOP NOW</span>
            </div>
        </div>
        ,
        <div className="carousel-item" id="seven">
            <div className="row">
                <h2>Shoes</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Quis ipsum sus-pendisse ultrices gravida. Risus
                commodo viverra maecenas accumsan lacus vel facilisis. </p>
            </div>
            <div className="offer-card z-depth-5">
                <span>from</span>
                <h1>$29</h1>
                <span>SHOP NOW</span>
            </div>
        </div>
    ]
    return (
        <>
            <AliceCarousel
                mouseTracking={true}
                animationType="fadeout"
                items={items}
                autoHeight={true}
                autoWidth={true}
                autoPlay={true}
                autoPlayInterval={3000}
                infinite={true}
                disableButtonsControls={true}
                disableDotsControls={true}
            />
        </>
    )
}

