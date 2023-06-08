import React from 'react'

function Carosel() {
        const settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        };

    return (
        <div>
        <Slider {...settings}>

          </Slider>
    </div>
  )
}

export default Carosel


