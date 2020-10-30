import React from 'react'

export default function Footer() {
    return (
        <>
            <section className="footer-section">
                <div className="container">

                    <div >
                        <div className="aboutus text-white">
                            <h2>About us</h2>
                            <p>Donec vitae purus nunc. Morbi faucibus erat sit amet congue mattis. Nullam frin-gilla
							faucibus urna, id dapibus erat iaculis ut. Integer ac sem.</p>
                            <img src="img/cards.png" alt="" />
                        </div>
                    </div>
                </div>
                <div className="social-links-warp">
                    <div className="container">
                        <p className="text-white text-center">Copyright &copy;
					<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is
					made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com"
                                target="_blank">Ashish</a></p>
                    </div>
                </div>
            </section>
        </>
    )
}
