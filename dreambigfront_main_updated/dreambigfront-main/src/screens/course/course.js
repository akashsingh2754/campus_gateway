import React, { lazy, useEffect } from "react";
import './course.css'
import logo from './img/logo.png'
import digital from './img/digital.jpg'
import growl from './img/grow-lazy.jpg'
import grow from './img/grow.jpg'
import hero from './img/hero.png'
import card from "./img/card.jpg"
import icon from './img/icon.png'


import user1 from './img/user-1.jpg'
import user2 from './img/user-2.jpg'
import user3 from './img/user-3.jpg'
const Course=()=>{
  useEffect(()=>{
    'use strict';

    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    const btnCloseModal = document.querySelector('.btn--close-modal');
    const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
    const btnScrollTo = document.querySelector('.btn--scroll-to');
    const section1 = document.querySelector('#section--1');
    const nav = document.querySelector('.nav');
    const tabs = document.querySelectorAll('.operations__tab');
    const tabsContainer = document.querySelector('.operations__tab-container');
    const tabsContent = document.querySelectorAll('.operations__content');
    
    ///////////////////////////////////////
    // Modal window
    
    const openModal = function (e) {
      e.preventDefault();
      modal.classList.remove('hidden');
      overlay.classList.remove('hidden');
    };
    
    const closeModal = function () {
      modal.classList.add('hidden');
      overlay.classList.add('hidden');
    };
    
    btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
    
    btnCloseModal.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
      }
    });
    
    ///////////////////////////////////////
    // Button scrolling
    btnScrollTo.addEventListener('click', function (e) {
      const s1coords = section1.getBoundingClientRect();
      console.log(s1coords);
    
      console.log(e.target.getBoundingClientRect());
    
      console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
    
      console.log(
        'height/width viewport',
        document.documentElement.clientHeight,
        document.documentElement.clientWidth
      );
    
      // Scrolling
      // window.scrollTo(
      //   s1coords.left + window.pageXOffset,
      //   s1coords.top + window.pageYOffset
      // );
    
      // window.scrollTo({
      //   left: s1coords.left + window.pageXOffset,
      //   top: s1coords.top + window.pageYOffset,
      //   behavior: 'smooth',
      // });
    
      section1.scrollIntoView({ behavior: 'smooth' });
    });
    
    ///////////////////////////////////////
    // Page navigation
    
    // document.querySelectorAll('.nav__link').forEach(function (el) {
    //   el.addEventListener('click', function (e) {
    //     e.preventDefault();
    //     const id = this.getAttribute('href');
    //     console.log(id);
    //     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    //   });
    // });
    
    // 1. Add event listener to common parent element
    // 2. Determine what element originated the event
    
    document.querySelector('.nav__links').addEventListener('click', function (e) {
      e.preventDefault();
    
      // Matching strategy
      if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
      }
    });
    
    ///////////////////////////////////////
    // Tabbed component
    
    tabsContainer.addEventListener('click', function (e) {
      const clicked = e.target.closest('.operations__tab');
    
      // Guard clause
      if (!clicked) return;
    
      // Remove active classes
      tabs.forEach(t => t.classList.remove('operations__tab--active'));
      tabsContent.forEach(c => c.classList.remove('operations__content--active'));
    
      // Activate tab
      clicked.classList.add('operations__tab--active');
    
      // Activate content area
      document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');
    });
    
    ///////////////////////////////////////
    // Menu fade animation
    const handleHover = function (e) {
      if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');
    
        siblings.forEach(el => {
          if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
      }
    };
    
    // Passing "argument" into handler
    nav.addEventListener('mouseover', handleHover.bind(0.5));
    nav.addEventListener('mouseout', handleHover.bind(1));
    
    ///////////////////////////////////////
    // Sticky navigation: Intersection Observer API
    
    const header = document.querySelector('.header');
    const navHeight = nav.getBoundingClientRect().height;
    
    const stickyNav = function (entries) {
      const [entry] = entries;
      // console.log(entry);
    
      if (!entry.isIntersecting) nav.classList.add('sticky');
      else nav.classList.remove('sticky');
    };
    
    const headerObserver = new IntersectionObserver(stickyNav, {
      root: null,
      threshold: 0,
      rootMargin: `-${navHeight}px`,
    });
    
    headerObserver.observe(header);
    
    ///////////////////////////////////////
    // Reveal sections
    const allSections = document.querySelectorAll('.section');
    
    const revealSection = function (entries, observer) {
      const [entry] = entries;
    
      if (!entry.isIntersecting) return;
    
      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target);
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
      root: null,
      threshold: 0.15,
    });
    
    allSections.forEach(function (section) {
      sectionObserver.observe(section);
      section.classList.add('section--hidden');
    });
    
    // Lazy loading images
    const imgTargets = document.querySelectorAll('img[data-src]');
    
    const loadImg = function (entries, observer) {
      const [entry] = entries;
    
      if (!entry.isIntersecting) return;
    
      // Replace src with data-src
      entry.target.src = entry.target.dataset.src;
    
      entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
      });
    
      observer.unobserve(entry.target);
    };
    
    const imgObserver = new IntersectionObserver(loadImg, {
      root: null,
      threshold: 0,
      rootMargin: '200px',
    });
    
    imgTargets.forEach(img => imgObserver.observe(img));
    
    ///////////////////////////////////////
    // Slider
    const slider = function () {
      const slides = document.querySelectorAll('.slide');
      const btnLeft = document.querySelector('.slider__btn--left');
      const btnRight = document.querySelector('.slider__btn--right');
      const dotContainer = document.querySelector('.dots');
    
      let curSlide = 0;
      const maxSlide = slides.length;
    
      // Functions
      const createDots = function () {
        slides.forEach(function (_, i) {
          dotContainer.insertAdjacentHTML(
            'beforeend',
            `<button class="dots__dot" data-slide="${i}"></button>`
          );
        });
      };
    
      const activateDot = function (slide) {
        document
          .querySelectorAll('.dots__dot')
          .forEach(dot => dot.classList.remove('dots__dot--active'));
    
        document
          .querySelector(`.dots__dot[data-slide="${slide}"]`)
          .classList.add('dots__dot--active');
      };
    
      const goToSlide = function (slide) {
        slides.forEach(
          (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
        );
      };
    
      // Next slide
      const nextSlide = function () {
        if (curSlide === maxSlide - 1) {
          curSlide = 0;
        } else {
          curSlide++;
        }
    
        goToSlide(curSlide);
        activateDot(curSlide);
      };
    
      const prevSlide = function () {
        if (curSlide === 0) {
          curSlide = maxSlide - 1;
        } else {
          curSlide--;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
      };
    
      const init = function () {
        goToSlide(0);
        createDots();
    
        activateDot(0);
      };
      init();
    
      // Event handlers
      btnRight.addEventListener('click', nextSlide);
      btnLeft.addEventListener('click', prevSlide);
    
      document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevSlide();
        e.key === 'ArrowRight' && nextSlide();
      });
    
      dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dots__dot')) {
          const { slide } = e.target.dataset;
          goToSlide(slide);
          activateDot(slide);
        }
      });
    };
    slider();
    
   
  
  
  },[]);
  return(
        <>
<div className="course">
  <header className="header">
    <nav className="nav">
     
      <ul className="nav__links">
        <li className="nav__item">
          <a className="nav__link" href="#section--1">
            Features
          </a>
        </li>
        <li className="nav__item">
          <a className="nav__link" href="#section--2">
            Operations
          </a>
        </li>
        <li className="nav__item">
          <a className="nav__link" href="#section--3">
            Testimonials
          </a>
        </li>
        <li className="nav__item">
          <a className="nav__link nav__link--btn btn--show-modal" href="#">
            Test a demo
          </a>
        </li>
      </ul>
    </nav>
    <div className="header__title">
      {/* <h1 onclick="alert('HTML alert')"> */}
      <h1>
        When admission&nbsp;
        {/* Green highlight effect */}
        <span className="highlight"></span>
        become
        <br />
        <span className="highlight">more easier</span>
      </h1>
      <h4>A simple steps to complete your studies</h4>
      <button className="btn--text btn--scroll-to">Learn more ↓</button>
      <img
        src={hero}
        className="header__img"
        alt="Minimalist bank items"
      />
    </div>
  </header>
  <section className="section" id="section--1">
    <div className="section__title">
      <h2 className="section__description">Features</h2>
      <h3 className="section__header">
        Everything you need in a modern admission process and management.
      </h3>
    </div>
    <div className="features">
      <img
        src="img/digital-lazy.jpg"
        data-src={digital}
        alt="Computer"
        className="features__img lazy-img"
      />
      <div className="features__feature">
        <div className="features__icon">
          <svg>
            <use xlinkHref="img/icons.svg#icon-monitor" />
          </svg>
        </div>
        <h5 className="features__header">100% digital process</h5>
        <p>
          Grab the opportunity to ugrade your qualification .
        </p>
      </div>
      <div className="features__feature">
        <div className="features__icon">
          <svg>
            <use xlinkHref="img/icons.svg#icon-trending-up" />
          </svg>
        </div>
        <h5 className="features__header">Choose your desirable college</h5>
        <p>
          We provide public survey about the best colleges.
        </p>
      </div>
      <img
        src={growl}
        data-src={grow}
        alt="Plant"
        className="features__img lazy-img"
      />
      <img
        src={growl}
        data-src={card}
        alt="Credit card"
        className="features__img lazy-img"
      />
      <div className="features__feature">
        <div className="features__icon">
          <svg>
            <use xlinkHref="img/icons.svg#icon-credit-card" />
          </svg>
        </div>
        <h5 className="features__header">24x7 support included</h5>
        <p>
          get 24x7 assistance from the chatbot support.
        </p>
      </div>
    </div>
  </section>
  <section className="section" id="section--2">
    <div className="section__title">
      <h2 className="section__description">Operations</h2>
      <h3 className="section__header">
        Everything as simple as possible, but no simpler.
      </h3>
    </div>
    <div className="operations">
      <div className="operations__tab-container">
        <button
          className="btn operations__tab operations__tab--1 operations__tab--active"
          data-tab={1}
        >
          <span>01</span>Register yourself with legal documents
        </button>
        <button className="btn operations__tab operations__tab--2" data-tab={2}>
          <span>02</span>Get shortlist as per criteria
        </button>
        <button className="btn operations__tab operations__tab--3" data-tab={3}>
          <span>03</span>Conect with exams and interviews
        </button>
      </div>
      <div className="operations__content operations__content--1 operations__content--active">
        <div className="operations__icon operations__icon--1">
          <svg>
            <use xlinkHref="img/icons.svg#icon-upload" />
          </svg>
        </div>
        <h5 className="operations__header">
          get the legal guidance and connect with top lawyer
        </h5>
        <p>
          Our platform provide the legal guidance to all the problem and also get the top cooperate lawyer to provide the best
        </p>
      </div>
      <div className="operations__content operations__content--2">
        <div className="operations__icon operations__icon--2">
          <svg>
            <use xlinkHref="img/icons.svg#icon-home" />
          </svg>
        </div>
        <h5 className="operations__header">
           Take admission anywhere simply by sitting at your native
        </h5>
        <p>
         We provide all the facilities through which a students can enroll themself to courses in specific colleges . 
        </p>
      </div>
      <div className="operations__content operations__content--3">
        <div className="operations__icon operations__icon--3">
          <svg>
            <use xlinkHref="img/icons.svg#icon-user-x" />
          </svg>
        </div>
        <h5 className="operations__header">
          get more
        </h5>
        <p>
        Not just the VC we also provide connection to company and college incubators for better guidance and expansion.
        </p>
      </div>
    </div>
  </section>
  <section className="section" id="section--3">
    <div className="section__title section__title--testimonials">
      <h2 className="section__description">Not sure yet?</h2>
      <h3 className="section__header">
        steppsteupstepup.
      </h3>
    </div>
    <div className="slider">
      <div className="slide">
        <div className="testimonial">
          <h5 className="testimonial__header"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, cumque eaque veritatis aliquid amet consequuntur cupiditate. Odit corrupti maiores atque est, molestiae provident. Excepturi molestiae fuga, quas incidunt neque quae.</h5>
          <blockquote className="testimonial__text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Accusantium quas quisquam non? Quas voluptate nulla minima deleniti
            optio ullam nesciunt, numquam corporis et asperiores laboriosam
            sunt, praesentium suscipit blanditiis. Necessitatibus id alias
            reiciendis, perferendis facere pariatur dolore veniam autem esse non
            voluptatem saepe provident nihil molestiae.
          </blockquote>
          <address className="testimonial__author">
            <img src={user1} alt="" className="testimonial__photo" />
            <h6 className="testimonial__name">Aarav Lynn</h6>
            <p className="testimonial__location">Bengaluru,INDIA</p>
          </address>
        </div>
      </div>
      <div className="slide">
        <div className="testimonial">
          <h5 className="testimonial__header">
            The last step to becoming a complete entrepreneur
          </h5>
          <blockquote className="testimonial__text">
            Quisquam itaque deserunt ullam, quia ea repellendus provident,
            ducimus neque ipsam modi voluptatibus doloremque, corrupti laborum.
            Incidunt numquam perferendis veritatis neque repellendus. Lorem,
            ipsum dolor sit amet consectetur adipisicing elit. Illo deserunt
            exercitationem deleniti.
          </blockquote>
          <address className="testimonial__author">
            <img src={user2} alt="" className="testimonial__photo" />
            <h6 className="testimonial__name">Miyah Miles</h6>
            <p className="testimonial__location">London, UK</p>
          </address>
        </div>
      </div>
      <div className="slide">
        <div className="testimonial">
          <h5 className="testimonial__header">
            Finally free from old-school teaching
          </h5>
          <blockquote className="testimonial__text">
            Debitis, nihil sit minus suscipit magni aperiam vel tenetur incidunt
            commodi architecto numquam omnis nulla autem, necessitatibus
            blanditiis modi similique quidem. Odio aliquam culpa dicta beatae
            quod maiores ipsa minus consequatur error sunt, deleniti saepe
            aliquid quos inventore sequi. Necessitatibus id alias reiciendis,
            perferendis facere.
          </blockquote>
          <address className="testimonial__author">
            <img src={user3} alt="" className="testimonial__photo" />
            <h6 className="testimonial__name">Francisco Gomes</h6>
            <p className="testimonial__location">Lisbon, Portugal</p>
          </address>
        </div>
      </div>
      <button className="slider__btn slider__btn--left">←</button>
      <button className="slider__btn slider__btn--right">→</button>
      <div className="dots" />
    </div>
  </section>
  <section className="section section--sign-up">
    <div className="section__title">
      <h3 className="section__header">
        The best day to join Bankist was one year ago. The second best is today!
      </h3>
    </div>
    <button className="btn btn--show-modal">
     Buy our mentorship program today
    </button>
  </section>
  <footer className="footer">
    <ul className="footer__nav">
      <li className="footer__item">
        <a className="footer__link" href="#">
          About
        </a>
      </li>
      <li className="footer__item">
        <a className="footer__link" href="#">
          Pricing
        </a>
      </li>
      <li className="footer__item">
        <a className="footer__link" href="#">
          Terms of Use
        </a>
      </li>
      <li className="footer__item">
        <a className="footer__link" href="#">
          Privacy Policy
        </a>
      </li>
      <li className="footer__item">
        <a className="footer__link" href="#">
          Careers
        </a>
      </li>
      <li className="footer__item">
        <a className="footer__link" href="#">
          Blog
        </a>
      </li>
      <li className="footer__item">
        <a className="footer__link" href="#">
          Contact Us
        </a>
      </li>
    </ul>
    <img src={icon} alt="Logo" className="footer__logo" />
    <p className="footer__copyright">
      © Copyright by <br></br>
      
         kryptonite
      
      
    </p>
  </footer>
  <div className="modal hidden">
    <button className="btn--close-modal">×</button>
    <h2 className="modal__header">
      Buy course now <br />
      in just <span className="highlight">5 minutes</span>
    </h2>
    <form className="modal__form">
      <label>First Name</label>
      <input type="text" />
      <label>Last Name</label>
      <input type="text" />
      <label>Email Address</label>
      <input type="email" />
      <button className="btn">Next step →</button>
    </form>
  </div>
  <div className="overlay hidden" />
  </div>
</>

    )
}


export default Course;