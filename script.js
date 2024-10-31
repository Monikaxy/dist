const fadeScrollyBlocks = document.querySelectorAll('[data-scrollytelling-transition="fade"]');



class FadeScrollyBlock {
    constructor(scrollytellingElement) {
        this.parent = scrollytellingElement;
        this.slides = scrollytellingElement.querySelectorAll('[data-scrollytelling-slide]');
        this.text = scrollytellingElement.querySelectorAll('[data-scrollytelling-assosicated-slide]');
        this.slideInFocus = scrollytellingElement.querySelector('[data-scrollytelling-slide]').dataset.scrollytellingSlide;
        this.nextSlide = this.slideInFocus.nextSibling;
        this.previousSlide = null;
    }
    
    groupTextAndSlides() {
        const groupings = {};
        
        this.slides.forEach(slide => {
            const slideId = slide.dataset.scrollytellingSlide;
            const assosiciatedText = Array.from(this.text)
                .filter(text => text.dataset.scrollytellingAssosicatedSlide === slideId);
            
            groupings[slideId] = assosiciatedText;
        });
        
        return groupings;
    }
    
    setUpAnimationTriggers() {
        Object.entries(this.groupedSlidesAndText)
            .forEach(item => {
                
            })
    }
    
    init() {
        this.groupedSlidesAndText = this.groupTextAndSlides();
        
        this.setUpAnimationTriggers()
    }
  
    observers() {
        let observer = new IntersectionObserver((entries, observer) => { 
            entries.forEach(entry => {
                const isIntersecting = entry.isIntersecting;

                if (isIntersecting) {
                    const assosicatedSlideNumber = entry.target.dataset.scrollytellingAssosicatedSlide;
                    
                    const assosicatedSlide = Array.from(this.slides)
                        .find(slide => slide.dataset.scrollytellingSlide === assosicatedSlideNumber);
                    
                    
                    if (this.slideInFocus !== assosicatedSlideNumber) {
                        console.log(this.slideInFocus, assosicatedSlideNumber)
                        const inFocusSlideElement = Array.from(this.slides)
                            .find(slide => slide.dataset.scrollytellingSlide === this.slideInFocus);

                        inFocusSlideElement.style.opacity = 0;
                        assosicatedSlide.style.opacity = 1;

                        this.slideInFocus = assosicatedSlideNumber;
                    }
                }
            });
        }, {rootMargin: "-20px 0px -20px 0px"});
        
        this.text.forEach(text => observer.observe(text))
    }
}


fadeScrollyBlocks.forEach(block => {
  
  const fadeBlock = new FadeScrollyBlock(block);
  
  fadeBlock.observers();
  fadeBlock.init();
  
  
});

$(document).ready(function() {
    $(".card").click(function() {
      var cardNumber = $(this).data("num");
      console.log(cardNumber);
      var cardWidth = $(this).width();
      console.log(cardWidth);
      if ($(this).hasClass("focus")) {
        //do nothing
      } else {
        var nextCard = cardNumber + 1;
        var next = $(".card[data-num='" + nextCard + "']");
        console.log(next);
        if (next) {
          $(".card.focus").removeClass("focus");
          console.log(cardNumber);
          var animateLeft = -1 * cardWidth * cardNumber;
          $(".cardcontainer").animate({ left: animateLeft }, 2000);
          $(this).addClass("focus");
        }
      }
    });
  });
  
  