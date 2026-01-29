---
layout: default
title: "About the Working Principle of the Vishand Project"
date: 2025-08-21
---

## Robot Hand Project: Arduino Control with Vision-Based Gesture Recognition

In this post, we will explore my vision-based robot hand control project developed using a **PyQt6-based interface, OpenCV, and MediaPipe**. The main goal of this project is to process hand movements captured by a camera, calculate finger bending ratios, and send this data to an Arduino via a serial port. On the Arduino side, these values are used to control the servo motors of the robot hand. Below, you can watch a video recorded while testing the project:

[![Robot Hand Project - Video](https://img.youtube.com/vi/JaMeOAFJH1Y/0.jpg)](https://youtu.be/JaMeOAFJH1Y)

---

### General Principle

The project is built on three main principles:

1. **Hand tracking and landmark extraction (MediaPipe + OpenCV)**
   The captured frames are processed, and finger joint positions are detected.

2. **Mathematical calculations (Python functions)**
   Based on the detected coordinates, finger curl ratios (0.0–1.0) are calculated. For the thumb, a special angle-based calculation is applied.

3. **Hardware integration (PySerial + Arduino)**
   The calculated data is transmitted as strings to the Arduino and mapped to the servo motors.

---

### Project Software Architecture

The project is modularized into different files:

* **`main.py`**: Manages the interface, camera, and MediaPipe processing loop.
* **`dist_calculations.py`**: Contains the mathematical functions for finger curl calculations.
* **`app_serial.py`**: Handles serial communication with the Arduino.
* **`ui_main.py`**: Auto-generated code of the visual interface built with Qt Designer.

---

### Interface and Visual Components

The interface is designed with **PyQt6**. In `ui_main.py`, there are two main buttons:

* **Reset Hand**
* **Control Hand**

At the center, there is a `QGraphicsView` component. This displays the live camera feed along with the hand skeleton drawn by MediaPipe.

---

### Hand Motion Processing

Inside `main.py`, **OpenCV** continuously captures frames from the camera. With the MediaPipe Hands model, 21 key landmarks of the hand are extracted.

For example:

* Index finger: landmarks 5–8
* Middle finger: landmarks 9–12

Then, finger curl ratios are calculated using the functions from `dist_calculations.py`:

```python
self.curl_ratio["index"] = calc.calculate_finger_curl(
    self.landmarks["index"][0].y,
    self.landmarks["index"][2].y,
    self.landmarks["index"][3].y,
    self.handsize
)

```

For the thumb, a dedicated angle-based calculation (`calculate_thumb_curl`) is applied. The palm size is also measured using `calculate_palm_ratio` to correct perspective distortions.

---

### Hand Orientation Control

To prevent sending wrong values when the hand is incorrectly oriented, the code includes a **rotation check**. If the hand is not facing the correct way, a warning is shown on the screen:

```python
cv2.putText(frame, "Your hand is in the wrong orientation, show your palm!", (0, 50), ...)

```

This ensures that only properly positioned hands are processed.

---

### Communication with Arduino

In `app_serial.py`, there is an **automatic Arduino port detection** function. This eliminates the need to manually select the COM or ttyUSB port.

Data is sent over the serial port as follows:

```python
def send_data(data):
    if ser and ser.is_open:
        ser.write((data + '\n').encode('utf-8'))

```

Example of the transmitted format:

```
0.0-0.5-1.0-0.7-0.3-0.9

```

This string represents, in order: wrist, thumb, index, middle, ring, and pinky finger curl ratios.

---

### Conclusion and Evaluation

This project brings together **computer vision** and **robotic hardware control**. Its key strengths include:

* Accurate finger tracking thanks to MediaPipe.
* Mathematical normalization ensures reliable results across different hand sizes.
* Automatic port detection for serial communication.
* A user-friendly interface built with PyQt6.

Overall, the project is a strong example of human–machine interaction through vision-based processing. It provides a solid foundation that can be extended to other robotic systems (e.g., prosthetic control, VR/AR applications).
