
function JsLightbox() {

    let _this = this;
    this.imagesArray = [];
    this.currentImage;
    this.isLightbox = false;

    let controlsHTML = `
        <div class="lightbox-controls">
            <span class="lb-prev">&#10094</span>
            <span class="lb-next">&#10095</span>
            <span class="lb-close">&times;</span>
        </div>
    `; 

    this.render = () => {
        this.imagesArray = [];
        this.currentImage;
        this.isLightbox = false;
        

        document.querySelectorAll('img.js-lightbox').forEach((imgEl, index) => {
            _this.imagesArray.push(imgEl);

            imgEl.setAttribute("data-lightbox-index", index);
            imgEl.addEventListener("click", () => {
                _this.lightbox(imgEl);
            })
        })

        addKeyListeners();
    }

    this.lightbox = el => {
        this.hideLightbox();
        this.currentImage = el;
        this.isLightbox = true;

        let overlay = document.createElement('div');
        overlay.classList.add("lightbox-overlay");
        let imageContainer = document.createElement('div');
        imageContainer.classList.add("lightbox-image");

        let image = document.createElement('img');
        image.src = el.src;

        imageContainer.appendChild(image);

        document.querySelector('body').appendChild(overlay);
        document.querySelector('body').appendChild(imageContainer);

        prepareControls(el)
    }

    this.next = () => {
        let imgIndex = getCurrentImageIndex();
        if (imgIndex === _this.imagesArray.length - 1) {
            return;
        }
        _this.lightbox(_this.imagesArray[getCurrentImageIndex() + 1]);
    }

    this.prev = () => {
        let imgIndex = getCurrentImageIndex();
        if (imgIndex === 0) {
            return;
        }
        _this.lightbox(_this.imagesArray[getCurrentImageIndex() - 1]);
    }


    this.hideLightbox = () => {
        let overlay = document.querySelector('.lightbox-overlay');
        let image = document.querySelector('.lightbox-image');
        let controls = document.querySelector('.lightbox-controls');
        if (overlay) {
            document.querySelector('body').removeChild(overlay);
        }
        if (image) {
            document.querySelector('body').removeChild(image);
        }
        if (controls) {
            document.querySelector('body').removeChild(controls);
        }
        this.isLightbox = false;
    }

    function prepareControls(imgEl) {
        let controls = document.createElement('div');
        controls.innerHTML += controlsHTML;

        document.querySelector('body').appendChild(controls.querySelector('.lightbox-controls'));

        let imgIndex = getCurrentImageIndex();

        if (imgIndex > 0) {
            document.querySelector('.lb-prev').addEventListener("click", () => {
                _this.prev();
            })
        } else {
            document.querySelector('.lb-prev').classList.add(['lb-disabled']);
        }

        if (imgIndex < _this.imagesArray.length - 1) {

            document.querySelector('.lb-next').addEventListener("click", () => {
                _this.next();
            })
        } else {
            document.querySelector('.lb-next').classList.add(['lb-disabled']);
        }

        document.querySelector('.lb-close').addEventListener("click", () => {
            _this.hideLightbox();
        })

        showCounter();
    }

    function getCurrentImageIndex() {
        return +_this.currentImage.getAttribute("data-lightbox-index");
    }

    function bindKeys(e) {
        if (e.keyCode === 37 && _this.isLightbox) {
            _this.prev();
            return;
        } else if (e.keyCode === 39 && _this.isLightbox) {
            _this.next();
            return;
        } else if (e.keyCode === 27 && _this.isLightbox) {
            _this.hideLightbox();
            return;
        }
    }

    function addKeyListeners() {
        document.removeEventListener('keydown', bindKeys);
        document.addEventListener('keydown', bindKeys);
    }

    function showCounter() {
        let imgIndex = getCurrentImageIndex();
        let counter = document.createElement("span");
        let counter_HTML = `<br>${imgIndex + 1} of ${_this.imagesArray.length}`;
        counter.innerHTML = counter_HTML;
        document.querySelector('.lightbox-image').appendChild(counter);
    }
}