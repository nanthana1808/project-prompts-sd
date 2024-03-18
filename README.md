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
```json
{
  "prompt": "Sunset in the mountains, lake in front",
  "negative_prompt": "clouds, people",
  "sampler_name": "Euler",
  "steps": 20,
  "cfg_scale": 7,
  "height": 512,
  "width": 512,
  "seed": -1
}
