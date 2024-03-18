# Project: Visualization of Prompts Data on Stable Diffusion Models

This project provides a web-based interface for visualizing prompts data using Stable Diffusion models. Stable Diffusion is a powerful generative model capable of creating high-quality images based on textual prompts. This repository aims to simplify the process of generating and visualizing images using Stable Diffusion models.

## Installation STABLE DIFFUSION MODELS

To use Stable Diffusion Models, follow these steps:

1. Install STABLE DIFFUSION from [AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui.git) to your local machine:
   ```bash
   https://github.com/AUTOMATIC1111/stable-diffusion-webui.git

## Call API on local server

To use the API provided by Stable Diffusion Models, you can refer to the documentation available at: 
   [Stable Diffusion API Documentation](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API)

## How to use

You can utilize the API to generate images by providing the following parameters

**Example**
```javascript
   const requestData = {
    prompt: prompt,
    negative_prompt: negativePrompt,
    sampler_name: samplerName,
    steps: steps,
    cfg_scale: cfgScale,
    height: height,
    width: width,
    seed: seed,
  };
```
```python
@app.route('/sdapi/v1/txt2img', methods=['OPTIONS', 'POST'])
def handle_txt2img():
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        response.headers['Access-Control-Allow-Methods'] = 'POST'
        response.headers['Access-Control-Allow-Origin'] = '*' 
        return response
    elif request.method == 'POST':
        try:

            response = jsonify({"key": "value"})
            response.headers['Access-Control-Allow-Origin'] = '*'
            return response
        except Exception as e:
            return jsonify({"error": str(e)}), 500
```

**Format Image**

After generating images using the Stable Diffusion Models API, The number of images depends on what you specified for a batch size. The images are in base64 format, and therefore need to be decoded and saved to the file system as normal images:

```javascript
// Example code to decode and save images
// Make sure to replace 'result' with the variable containing your API response
// Ensure 'fs' module is imported and available in your environment
result.images.forEach((img, i) => {
  const buf = Buffer.from(img, 'base64');
  fs.writeFileSync(`image-${i}.png`, buf);
});
