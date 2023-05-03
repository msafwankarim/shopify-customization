const CustomCode = {
  CAR_MAKE_IMAGE_MAP: {
    bmw: {
      banner: "{{ 'bmw-banner.jpg' | asset_img_url: 'master' }}",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/600px-BMW.svg.png?20200406052529",
    },
  },

  initCarDetailsSelector: function () {
    let model_filters = {
      Make: null,
      Model: null,
      Year: null,
    };

    let carPropertiesContainer = document.getElementById(
      "car-properties-container"
    );
    if (!carPropertiesContainer) return;

    if (document.body.classList.contains("template-index")) {
      carPropertiesContainer.addEventListener("change", function (event) {
        let targetElem = event.target;
        switch (targetElem.name) {
          case "properties[Make]":
            model_filters.Make = targetElem.value;
            break;
          case "properties[Model]":
            model_filters.Model = targetElem.value;
            break;
          case "properties[Year]":
            model_filters.Year = targetElem.value;
            break;
          default:
            return;
        }

        sessionStorage.setItem("model_filters", JSON.stringify(model_filters));
        //     console.log(event);
      });
    } else if (document.body.classList.contains("template-product")) {
      model_filters = JSON.parse(sessionStorage.getItem("model_filters"));
      let makeSelect = document.getElementById("make");
      let modelSelect = document.getElementById("models");
      let yearSelect = document.getElementById("modelyear");

      if (model_filters) makeSelect.value = model_filters.Make;
      makeSelect.dispatchEvent(new Event("change"));

      if (model_filters) modelSelect.value = model_filters.Model;
      modelSelect.dispatchEvent(new Event("change"));

      if (model_filters) yearSelect.value = model_filters.Year;
      yearSelect.dispatchEvent(new Event("change"));
    }
  },

  getImageForMake: function (make) {
    return this.CAR_MAKE_IMAGE_MAP[make.toLowerCase().trim()].banner;
  },

  getLogoForMake: function (make) {
    return this.CAR_MAKE_IMAGE_MAP[make.toLowerCase().trim()].logo;
  },

  initCarMakeBanner: function () {
    const model_filters = JSON.parse(sessionStorage.getItem("model_filters"));

    if (!model_filters || !model_filters.Make) return;

    const imgSrc = this.getImageForMake(model_filters.Make);
    const bannerContainer = document.querySelector(".js-car-make-banner");
    const logoImg = document.querySelector(".car-make-logo");
    const image = document.createElement("img");

    image.src = imgSrc;
    image.style.visibility = "hidden";
    bannerContainer.appendChild(image);
    bannerContainer.style.backgroundImage = `url('${imgSrc}')`;

    logoImg.src = this.getLogoForMake(model_filters.Make);
    logoImg.onload = (e) => {
      logoImg.classList.remove("hidden");
    };
  },
};
document.addEventListener("DOMContentLoaded", () => {
  try {
    // keeping both calls independant so failing one won't fail other
    CustomCode.initCarDetailsSelector();
  } catch (e) {
    console.error(e);
  }
  try {
    CustomCode.initCarMakeBanner();
  } catch (e) {
    console.error(e);
  }
});
