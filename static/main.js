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

function convertPrompt() {
  const thaiPrompt = document.getElementById("thai-prompt").value;

  fetch('/translate_prompt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ thai_prompt: thaiPrompt }),
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById("english-prompt").value = data.english_prompt;
    })
    .catch(error => {
      console.error('Error translating prompt:', error);
    });
}

// Function to make API request and update images on the webpage
async function callTxt2ImgAPI() {
  const apiUrl = 'http://localhost:7860/sdapi/v1/txt2img';

  // Get values from HTML elements
  const prompt = document.getElementById('thai-prompt').value;
  const negativePrompt = document.getElementById('in-neprompt').value;
  const samplerName = document.getElementById('method-type').value;
  const steps = parseInt(document.getElementById('step-value').value);
  const cfgScale = parseInt(document.getElementById('cfg-value').value);
  const height = parseInt(document.getElementById('height-dropdown').value);
  const width = parseInt(document.getElementById('width-dropdown').value);
  const seed = parseInt(document.getElementById('seed').value);

  const requestData = {
    prompt: prompt,
    negative_prompt: negativePrompt,
    sampler_name: samplerName,
    steps: steps,
    cfg_scale: cfgScale,
    height: height,
    width: width,
    seed: seed
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    // Update the image source with the base64 data of the first image
    const resultImage = document.getElementById('result-image');
    resultImage.src = `data:image/png;base64, ${result.images[0]}`;

  } catch (error) {
    console.error('Error calling API:', error);
  }
}
