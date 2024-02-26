document.addEventListener('DOMContentLoaded', function () {
    const stepSlider = document.getElementById("step-slider");
    const stepValue = document.getElementById("step-value");
    const cfgSlider = document.getElementById("cfg-slider");
    const cfgValue = document.getElementById("cfg-value");

    stepSlider.addEventListener("input", updateSliderValue.bind(null, stepSlider, stepValue));
    cfgSlider.addEventListener("input", updateSliderValue.bind(null, cfgSlider, cfgValue));
    stepValue.addEventListener("input", updateTextBoxValue.bind(null, stepSlider, stepValue));
    cfgValue.addEventListener("input", updateTextBoxValue.bind(null, cfgSlider, cfgValue));

    function updateSliderValue(slider, valueBox) {
      valueBox.value = slider.value;
    }

    function updateTextBoxValue(slider, valueBox) {
      let newValue = parseFloat(valueBox.value);

      if (newValue >= parseFloat(slider.min) && newValue <= parseFloat(slider.max)) {
        slider.value = newValue;
      } else {
        slider.value = newValue < parseFloat(slider.min) ? slider.min : slider.max;
      }

      valueBox.value = slider.value;
    }
  });