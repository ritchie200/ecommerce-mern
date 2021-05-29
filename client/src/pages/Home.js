import React from 'react';

export class Home extends React.Component {
  render() {
    return (
        <div>
               <div className="article-list">
          <div className="container">
            <div className="intro">
              <h2 className="text-center">Shop</h2>
              <p className="text-center">We have one of the finest Shirts , Pants and Suits in our store. Do visit our store!</p>
            </div>
            <div className="row articles">
              <div className="col-sm-6 col-md-4 item"><a href="#"><img className="img-fluid" src="assets/img/pexels-ajaykumar-narwade-1337477.jpg" /></a>
                <h3 className="name">Shirt</h3>
                <p className="description">We have some of the finest suits around the world.</p><a className="action" href="#"><i className="fa fa-arrow-circle-right" /></a></div>
              <div className="col-sm-6 col-md-4 item"><a href="#"><img className="img-fluid" src="assets/img/pexels-jt-kim-914472.jpg" /></a>
                <h3 className="name">Pant</h3>
                <p className="description">We have Jeans, Trousers from various brands.</p><a className="action" href="#"><i className="fa fa-arrow-circle-right" /></a></div>
              <div className="col-sm-6 col-md-4 item"><a href="#"><img className="img-fluid" src="assets/img/pexels-the-lazy-artist-gallery-1342609.jpg" /></a>
                <h3 className="name">Suit</h3>
                <p className="description">We have some of the finest suits around the world.</p><a className="action" href="#"><i className="fa fa-arrow-circle-right" /></a></div>
            </div>
          </div>
        </div>
        <div className="testimonials-clean">
          <div className="container">
            <div className="intro">
              <h2 className="text-center">Testimonials </h2>
              <p className="text-center">Our customers love us! Read what they have to say below.</p>
            </div>
            <div className="row people">
              <div className="col-md-6 col-lg-4 item">
                <div className="box">
                  <p className="description">Awesome and fast service.</p>
                </div>
                <div className="author"><img className="rounded-circle" src="assets/img/1.jpg" />
                  <h5 className="name">Ben Johnson</h5>
                  <p className="title">CEO of Company Inc.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 item">
                <div className="box">
                  <p className="description">One of the best shopping portals in the market.</p>
                </div>
                <div className="author"><img className="rounded-circle" src="assets/img/3.jpg" />
                  <h5 className="name">Carl Kent</h5>
                  <p className="title">Founder of Style Co.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 item">
                <div className="box">
                  <p className="description">I ordered and received my order any delay. Very pleased.</p>
                </div>
                <div className="author"><img className="rounded-circle" src="assets/img/2.jpg" />
                  <h5 className="name">Emily Clark</h5>
                  <p className="title">Owner of Creative Ltd.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    )
  }
}
