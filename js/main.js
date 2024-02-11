$(document).ready(function(){
    //lenis
    const lenis = new Lenis()

    lenis.on('scroll', (e) => {
    console.log(e)
    })

    function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    //이미지 나타나기
    const ani1 = gsap.timeline();
    ani1.from("#cover .i1", {autoAlpha:0, opacity: 0, width: 0, duration: 0.7})
        .from("#cover .i2", {autoAlpha:0, opacity: 0, width: 0})
        .from("#cover .i3", {y: 100, autoAlpha:0, duration: 1})
        .from("#cover .i4", {y: 100, autoAlpha:0, duration: 1});
        //.from("#intro", {y: 100, autoAlpha:0});

    ScrollTrigger.create({
        animation: ani1,
        trigger: "#cover",
        start: "top top",
        end: "bottom bottom",
        //scrub: 1,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        markers: false
    });

    //header
    $('#header').hide();

    if (matchMedia("screen and (min-width: 1200px)").matches) {
        $(window).scroll(function(){
            if ($(this).scrollTop() > 600)
            {
                $('#header').fadeIn();
            }
            else {
                $('#header').hide();
            }
        });// 1200px 이상에서 사용할 스크립트
    } 

    else {
        $(window).scroll(function(){
            if ($(this).scrollTop() > 500)
            {
                $('#header').fadeIn();
            }
            else {
                $('#header').hide();
            }
        })// 1200px 미만에서 사용할 스크립트
    }

    //바로가기    
    let links = gsap.utils.toArray("#header .gnb li a");

    links.forEach(link => {
        let element = document.querySelector(link.getAttribute("href")),
        
        linkST = ScrollTrigger.create({
            trigger: element,
            start: "top top"
        });

        ScrollTrigger.create({
            trigger: element,
            start: "top center",
            end: "bottom center",
            onToggle: self => setActive(link)
        });

        link.addEventListener("click", e => {
            e.preventDefault();
            gsap.to(window, {duration: 1, scrollTo: linkST.start, overwrite: "auto"});
        });
    });

    function setActive(link) {
        links.forEach(el => el.classList.remove("on"));
        link.classList.add("on");
    }

    //스킬
    $('.skill_list > div').click(function(){
        $(this).find('.box_after').addClass("over");
    });

    //웹 작업물
    const pub = new Swiper('.pub',{
        speed: 1500,
        loop: true,

        navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        },

        pagination: {
            el: ".swiper-pagination",
        },
    });


    //그래픽 작업물
    $('.vis_list ul li:not(:nth-child(n+3):nth-child(-n+5)').click(function(){
        var indexNum = $(this).index();
        $('.vis_after div').eq(indexNum).fadeIn();
    });

    $('.vis_after div').click(function(){
        $(this).fadeOut();
    });
});