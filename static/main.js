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



// function call api from stable diffusion //
async function callTxt2ImgAPI() {
  // แสดง popup ก่อนทำการเรียก API
  document.getElementById('loading-popup').style.display = 'block';

  const apiUrl = 'http://localhost:7860/sdapi/v1/txt2img';

  // Get values from HTML elements
  const prompt = document.getElementById('english-prompt').value;
  const negativePrompt = document.getElementById('neprompt-content').value;
  const samplerName = document.getElementById('method-type').value;
  const steps = parseInt(document.getElementById('step-value').value);
  const cfgScale = parseInt(document.getElementById('cfg-value').value);
  const height = parseInt(document.getElementById('height-dropdown').value);
  const width = parseInt(document.getElementById('width-dropdown').value);
  const seed = parseInt(document.getElementById('seed').value);
  const checkpointName = document.getElementById('model-type').value;

  const requestData = {
    prompt: prompt,
    negative_prompt: negativePrompt,
    sampler_name: samplerName,
    steps: steps,
    cfg_scale: cfgScale,
    height: height,
    width: width,
    seed: seed,
    hr_checkpoint_name: checkpointName
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

    console.log('API Response:', result);
    var dataurl = "data:image/png;base64," + result.images[0]
    document.getElementById("result-image").src = dataurl

    if (result && typeof result === 'object' && 'key' in result) {
      const keyValue = result.key;
      console.log('Value:', keyValue);
    } else {
      console.error('Unexpected API response format:', result);
    }
  } catch (error) {
    console.error('Error calling API:', error);
  } finally {
    // ซ่อน popup เมื่อ API เสร็จสิ้น
    document.getElementById('loading-popup').style.display = 'none';
  }
}


function logout() {

  // ลบ localStorage ที่เก็บข้อมูลผู้ใช้หลังจากล็อกเอาท์
  localStorage.removeItem('userEmail');

  // Redirect หน้าหลังจากล็อกเอาท์ (ตัวอย่างเปลี่ยนไปหน้าล็อกอิน)
  window.location.href = '/'; 
}



// function toggleDropdown() {
//   var dropdownContent = document.getElementById("neprompt-content");
//   dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
// }

// function updateResult() {
//   var checkboxes = document.querySelectorAll('#neprompt-content input[type="checkbox"]:checked');
//   var resultInput = document.getElementById("result");
//   var selectedItems = Array.from(checkboxes).map(checkbox => checkbox.value).join(', ');
//   resultInput.value = selectedItems;
// }

// document.addEventListener('click', function(event) {
//   var dropdownBtn = document.getElementById('neprompt-btn');
//   var dropdownContent = document.getElementById('neprompt-content');
//   var resultInput = document.getElementById('result');

//   if (!dropdownBtn.contains(event.target) && !dropdownContent.contains(event.target) && event.target !== resultInput) {
//     dropdownContent.style.display = 'none';
//   }
// });

// document.querySelectorAll('#neprompt-content input[type="checkbox"]').forEach(function(checkbox) {
//   checkbox.addEventListener('change', updateResult);
// });