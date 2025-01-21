# DeepLX Serverless

English | [简体中文](./README.md)

DeepLX Free Translation API **Tencent Cloud Function Deployment Version**. Compared to the [original DeepLX project](https://github.com/OwO-Network/DeepLX), the main difference is that it **utilizes the dynamic IP feature of cloud functions, greatly reducing the '429' request frequency errors**.

Thanks to the original project [OwO-Network/DeepLX](https://github.com/OwO-Network/DeepLX) for the inspiration, which serves as the solid foundation for this project.

## Usage

### Prerequisites

- A computer or tablet
- A Tencent account or phone number

### Deploy

#### Tencent Cloud

Register an account at [https://cloud.tencent.com/](https://cloud.tencent.com/)

Go to the cloud function console: [https://console.cloud.tencent.com/scf/list](https://console.cloud.tencent.com/scf/list)

Click [New] -> [Start from Scratch], then configure as follows (**use default settings for unmentioned options**):

- Function Type: Web Function
- Function Name: deeplx (can be customized)
- Region: Any (domestic regions work as well)
- Runtime: Nodejs 16.13 (or higher version)
- Advanced Configuration:
    - Memory: 64M
    - Execution Timeout: 60 seconds
    - Concurrent Requests: 5 (2 works fine based on personal experience)
- Log Configuration -> Log Delivery: Enable (optional, costs a few cents per month if enabled)
- Function Code: Upload local zip package ([Download ZIP package](https://github.com/LegendLeo/deeplx-serverless/releases/download/v1.0.0/dist.zip))
- Trigger Configuration (you may need to create a new trigger):
    - Default trigger
    - Trigger Alias/Version: Default traffic
    - Request Method: ANY
    - Release Environment: Release
    - Authentication Method: No authentication

After deployment, click "Complete", enter [Function Management], click [Function Code], scroll down to find and copy the [Access Path] for later use.

#### Deploy to Vercel

Now supports deployment to Vercel. Click the button below for one-click deployment (Note: Testing shows it's less stable than Tencent Cloud and more prone to 429 errors)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FLegendLeo%2Fdeeplx-serverless)

### How to Use

Recommended to use with the Immersive Translation browser plugin. When using, replace the `/release` part in the access path with `translate`

For example: Change `https://service-aaaaa.gz.apigw.tencentcs.com/release/` to: `https://service-aaaaa.gz.apigw.tencentcs.com/translate`

Request example:

```bash
curl --location 'https://service-aaaaa.gz.apigw.tencentcs.com/translate' \
--header 'Content-Type: application/json' \
--data '{
    "text": "Hello, world",
    "source_lang": "en",
    "target_lang": "zh"
}'