# MediaPipe Tasks Vision Package

This package contains the vision tasks for MediaPipe.

## Face Detector

The MediaPipe Face Detector task lets you detect the presence and location of
faces within images or videos.

```
const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
);
const faceDetector = await FaceDetector.createFromModelPath(vision,
    "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite"
);
const image = document.getElementById("image") as HTMLImageElement;
const detections = faceDetector.detect(image);
```

For more information, refer to the [Face Detector](https://developers.google.com/mediapipe/solutions/vision/face_detector/web_js) documentation.

## Face Landmarker

The MediaPipe Face Landmarker task lets you detect the landmarks of faces in
an image. You can use this Task to localize key points of a face and render
visual effects over the faces.

```
const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
);
const faceLandmarker = await FaceLandmarker.createFromModelPath(vision,
    "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task"
);
const image = document.getElementById("image") as HTMLImageElement;
const landmarks = faceLandmarker.detect(image);
```

For more information, refer to the [Face Landmarker](https://developers.google.com/mediapipe/solutions/vision/face_landmarker/web_js) documentation.

## Gesture Recognizer

The MediaPipe Gesture Recognizer task lets you recognize hand gestures in real
time, and provides the recognized hand gesture results along with the landmarks
of the detected hands. You can use this task to recognize specific hand gestures
from a user, and invoke application features that correspond to those gestures.

```
const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
);
const gestureRecognizer = await GestureRecognizer.createFromModelPath(vision,
    "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task"
);
const image = document.getElementById("image") as HTMLImageElement;
const recognitions = gestureRecognizer.recognize(image);
```

For more information, refer to the [Gesture Recognizer](https://developers.google.com/mediapipe/solutions/vision/gesture_recognizer/web_js) documentation.

## Hand Landmarker

The MediaPipe Hand Landmarker task lets you detect the landmarks of the hands in
an image. You can use this Task to localize key points of the hands and render
visual effects over the hands.

```
const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
);
const handLandmarker = await HandLandmarker.createFromModelPath(vision,
    "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task"
);
const image = document.getElementById("image") as HTMLImageElement;
const landmarks = handLandmarker.detect(image);
```

For more information, refer to the [Hand Landmarker](https://developers.google.com/mediapipe/solutions/vision/hand_landmarker/web_js) documentation.


## Holistic Landmarker

The MediaPipe Holistic Landmarker task task lets you combine components of the
pose, face, and hand landmarkers to create a complete landmarker for the human
body.

```
const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
);
const holisticLandmarker = await HolisticLandmarker.createFromModelPath(vision,
    "https://storage.googleapis.com/mediapipe-models/holistic_landmarker/holistic_landmarker/float16/1/hand_landmark.task"
);
const image = document.getElementById("image") as HTMLImageElement;
const landmarks = holisticLandmarker.detect(image);
```

## Image Classifier

The MediaPipe Image Classifier task lets you perform classification on images.
You can use this task to identify what an image represents among a set of
categories defined at training time.

```
const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
);
const imageClassifier = await ImageClassifier.createFromModelPath(vision,
    "https://storage.googleapis.com/mediapipe-models/image_classifier/efficientnet_lite0/float32/1/efficientnet_lite0.tflite"
);
const image = document.getElementById("image") as HTMLImageElement;
const classifications = imageClassifier.classify(image);
```

For more information, refer to the [Image Classifier](https://developers.google.com/mediapipe/solutions/vision/image_classifier/web_js) documentation.

## Image Embedder

The MediaPipe Image Embedder extracts embeddings from an image.

```
const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
);
const imageEmbedder = await ImageEmbedder.createFromModelPath(vision,
    "https://storage.googleapis.com/mediapipe-models/image_embedder/mobilenet_v3_small/float32/1/mobilenet_v3_small.tflite"
);
const image = document.getElementById("image") as HTMLImageElement;
const embeddings = imageSegmenter.embed(image);
```

## Image Segmenter

The MediaPipe Image Segmenter lets you segment an image into categories.

```
const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
);
const imageSegmenter = await ImageSegmenter.createFromModelPath(vision,
    "https://storage.googleapis.com/mediapipe-models/image_segmenter/deeplab_v3/float32/1/deeplab_v3.tflite"
);
const image = document.getElementById("image") as HTMLImageElement;
imageSegmenter.segment(image, (masks, width, height) => {
  ...
});
```

For more information, refer to the [Image Segmenter](https://developers.google.com/mediapipe/solutions/vision/image_segmenter/web_js) documentation.

## Interactive Segmenter

The MediaPipe Interactive Segmenter lets you select a region of interest to
segment an image by.

```
const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
);
const interactiveSegmenter = await InteractiveSegmenter.createFromModelPath(
    vision,
    "https://storage.googleapis.com/mediapipe-models/interactive_segmenter/magic_touch/float32/1/magic_touch.tflite"
);
const image = document.getElementById("image") as HTMLImageElement;
interactiveSegmenter.segment(image, { keypoint: { x: 0.1, y: 0.2 } },
    (masks, width, height) => { ... }
);
```

For more information, refer to the [Interactive Segmenter](https://developers.google.com/mediapipe/solutions/vision/interactive_segmenter/web_js) documentation.

## Object Detector

The MediaPipe Object Detector task lets you detect the presence and location of
multiple classes of objects within images or videos.

```
const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
);
const objectDetector = await ObjectDetector.createFromModelPath(vision,
    "https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float16/1/efficientdet_lite0.tflite"
);
const image = document.getElementById("image") as HTMLImageElement;
const detections = objectDetector.detect(image);
```

For more information, refer to the [Object Detector](https://developers.google.com/mediapipe/solutions/vision/object_detector/web_js) documentation.

## Pose Landmarker

The MediaPipe Pose Landmarker task lets you detect the landmarks of body poses
in an image. You can use this Task to localize key points of a pose and render
visual effects over the body.

```
const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
);
const poseLandmarker = await PoseLandmarker.createFromModelPath(vision,
    "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task
);
const image = document.getElementById("image") as HTMLImageElement;
const landmarks = poseLandmarker.detect(image);
```

For more information, refer to the [Pose Landmarker](https://developers.google.com/mediapipe/solutions/vision/pose_landmarker/web_js) documentation.

<!-- KARI-maintained bilingual companion; upstream text above is unchanged. -->

# MediaPipe README 中文补充 / Chinese companion

**语言 / Language:** [简体中文](#简体中文) · [English](#english)

## 简体中文

本补充由 KARI 维护者编写，不是 Google 官方翻译。生成资源时附在上游 MediaPipe Tasks Vision README 后；上游原文、代码、链接和许可证保持不变。软件包包含多种视觉任务，不代表 KARI 已启用全部任务。KARI 使用的具体模型、固定版本、离线资源与哈希以本项目资源清单为准，不能将上游 CDN 示例当成本项目离线部署配置。

共同流程：FilesetResolver.forVisionTasks 定位 WASM 运行库，各任务 createFromModelPath 加载对应模型，再对图像调用推理方法。上游各章节提供原始 JS/TypeScript 示例和对应官方链接，中文任务对照如下。

| 任务 | 中文说明与调用 |
| --- | --- |
| Face Detector | 检测图像/视频中人脸是否存在及其位置；detect(image) |
| Face Landmarker | 提取人脸关键点，用于定位与视觉效果；detect(image) |
| Gesture Recognizer | 识别手势并返回手部关键点，可用于触发应用功能；recognize(image) |
| Hand Landmarker | 定位手部关键点并叠加视觉效果；detect(image) |
| Holistic Landmarker | 组合人体姿态、脸部与手部关键点；detect(image) |
| Image Classifier | 在训练定义的类别中识别整张图像；classify(image) |
| Image Embedder | 把图像转成嵌入向量，用于相似度等；使用 ImageEmbedder 的 embed 方法 |
| Image Segmenter | 将图像分成类别掩码，通过 segment 回调获取结果 |
| Interactive Segmenter | 按用户兴趣点选定区域分割；segment 传入 keypoint |
| Object Detector | 检测多个类别的对象及边框；detect(image) |
| Pose Landmarker | 定位人体姿态关键点，可叠加视觉效果；detect(image) |

示例中的模型各自对应任务，不可互换；外链示例资源需要网络。上游示例可能包含占位代码或笔误，实际调用以所固定版本的 API 为准。本补充不声称为各示例执行了验证。保留原始来源说明、Apache-2.0 和随资源分发的其他许可证。

## English

This companion is maintained by KARI and is not an official Google translation. Resource generation appends it to the unmodified upstream MediaPipe Tasks Vision README, retaining code, links, attribution and licenses. The package supports many tasks; that does not mean KARI enables all of them. KARI's pinned manifest defines its deployed models, runtime and hashes; upstream CDN examples are not an offline configuration.

Resolve WASM with FilesetResolver.forVisionTasks, load the matching task model with createFromModelPath, then infer. The upstream sections retain their code examples and reference links.

| Task | Purpose / inference |
| --- | --- |
| Face Detector | Detect face presence/location; detect(image) |
| Face Landmarker | Locate facial landmarks for effects; detect(image) |
| Gesture Recognizer | Recognize gestures and hand landmarks; recognize(image) |
| Hand Landmarker | Locate hand landmarks; detect(image) |
| Holistic Landmarker | Combine body, face and hand landmarks; detect(image) |
| Image Classifier | Classify a whole image into trained categories; classify(image) |
| Image Embedder | Extract image embeddings with ImageEmbedder.embed |
| Image Segmenter | Produce category masks through segment callbacks |
| Interactive Segmenter | Segment a selected region using a keypoint |
| Object Detector | Detect multiple object classes and boxes; detect(image) |
| Pose Landmarker | Locate body-pose landmarks; detect(image) |

Models are task-specific and not interchangeable. External example assets need a network; placeholders/possible upstream typos are not validated runnable KARI examples. Consult the pinned API. Preserve upstream attribution, Apache-2.0 and all separately shipped licenses.
