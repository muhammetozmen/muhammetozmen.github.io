---
layout: post
title: "Autonomous Vehicle Threat Assessment Integration – Graduation Project"
lang: en
date: 17-10-2025
description: "YOLOv8-based short-range threat assessment, moving camera tracking, and Arduino-controlled laser/LED integration"
categories: [project]
connection: https://muhammetozmen.github.io/assets/post_images/turet/212523019_muhammet_ozmen_final.pdf
---

## Project Purpose and Scope

This project is my senior capstone (Undergraduate, 4th year, Fall 2025) at İskenderun Technical University. The thesis was accepted and successfully completed.

You can access the full, more detailed thesis <a href="/assets/post_images/turet/212523019_muhammet_ozmen_final.pdf" target="_blank">here</a>.

A **locally running** threat-assessment module was developed to be mounted on urban-security-oriented autonomous/semi-autonomous systems. From the camera stream it determines in real time whether a **person is armed or unarmed**, reports status and coordinates to the host PC, and simultaneously tracks the target with a two-axis turret. The system is designed to be integrated into drones or ground robots via a lightweight gimbal structure.

---

## General Operating Principle

* **Perception (Model):** Webcam frames are processed with **YOLOv8**; person/weapon objects and center coordinates are extracted.
* **Decision:** The state is classified into three categories: `A=Unarmed Person`, `B=Armed Person`, `C=None`. Time tolerances are applied to handle brief occlusions of the weapon/person.
* **Action (Turret):** Horizontal/vertical servos move according to coordinate error; a **laser** and an **RGB LED** are used as status indicators.

<p align="center">
  <img src="/assets/post_images/turet/turet-1.png" alt="Turret Image">
  <br>
  <em>Turret Image – Front view of the prototype</em>
</p>
<p align="center">
  <img src="/assets/post_images/turet/turet-2.png" alt="Turret Image">
  <br>
  <em>Turret Image – Left and front views of the prototype</em>
</p>
<p align="center">
  <img src="/assets/post_images/turet/turet-3.png" alt="Turret Image">
  <br>
  <em>Turret Image – Top view of the prototype</em>
</p>

---

## Hardware Architecture

* **Microcontroller:** Arduino UNO (ample pins, sufficient processing power, serial communication).
* **Servos:** 2× **MG90S** (metal gears, ~1.5 kg·cm torque class).
* **Indicators:** 5V **laser** module and **RGB LED** module.
* **Power:** For stability, servos are powered from a dedicated **5V/1.5A adapter**; other modules from the Arduino.
* **Imaging:** USB **2 MP webcam** (power/data from PC).
* **Mechanics:** Gimbal/turret parts via 3D print (**ABS** for strength, **PLA** for light weight); wood used for base/frame parts.

<p align="center">
  <img src="/assets/post_images/turet/turet-4.png" alt="Circuit Image">
  <br>
  <em>Circuit Image – Schematic of the prototype</em>
</p>
<p align="center">
  <img src="/assets/post_images/turet/turet-5.png" alt="Circuit Image">
  <br>
  <em>Circuit Image – Prototype schematic in Tinkercad</em>
</p>

---

## Software Structure

### 1) Application (PC side)

* **Language/Libraries:** Python, **YOLOv8**, OpenCV, **PySide6** (GUI).
* **Workflow:** Capture frame → detect person/weapon with YOLOv8 → extract class and coordinates → apply time tolerances → create **serial message** → send to Arduino.
* **Time Tolerances:** `GUN_WAIT=10s`, `MAN_WAIT=1s` (maintains stability even if the weapon/person is briefly occluded).
* **Serial Protocol:**

  ```
  {center_x:03}{center_y:03}{C3}{C4}\n
  C3 ∈ {A,B,C}   # state
  C4 ∈ {Y,N}     # laser on/off
  ```
* **Per-class Object Limits:** e.g., `{0:1, 1:1}` (person=0, weapon=1).

<p align="center">
  <img src="/assets/post_images/turet/turet-6.png" alt="Application Flowchart">
  <br>
  <em>Turret Image – Application software flowchart</em>
</p>
<p align="center">
  <img src="/assets/post_images/turet/turet-7.png" alt="Turret Flowchart">
  <br>
  <em>Turret Image – Turret (firmware) software flowchart</em>
</p>

### 2) Turret (Arduino side)

* **Pins:** RGB LED (2–4), Horizontal servo (5), Vertical servo (6), Laser (7), Serial 9600.
* **State Management:**

  * `A` (unarmed): LED=green, target tracking active
  * `B` (armed): LED=red, target tracking + optional laser
  * `C` (none): LED=blue, **scan mode** (sweep left–right)
* **Motion:** Screen center `(320,240)` as reference; if error > tolerance, increment/decrement per axis; clamp vertical 0–90°, horizontal 0–180°.

<p align="center">
  <img src="/assets/post_images/turet/turet-8.png" alt="Unarmed Response">
  <br>
  <em>Turret Image – Prototype response when an UNARMED person is detected</em>
</p>
<p align="center">
  <img src="/assets/post_images/turet/turet-9.png" alt="Armed Response">
  <br>
  <em>Turret Image – Prototype response when an ARMED person is detected</em>
</p>
<p align="center">
  <img src="/assets/post_images/turet/turet-10.png" alt="Idle Response">
  <br>
  <em>Turret Image – Prototype response when IDLE</em>
</p>

---

## Model (YOLOv8) Training and Testing

* **Base model:** Fine-tuned `yolov8l.pt` with close-range data.
* **Example hyperparameters:** `epochs=64`, `batch=8`; dataset focused on short-distance/altitude scenarios.
* **Outputs:** Label/prediction samples and validation with field video frames.

<p align="center">
  <img src="/assets/post_images/turet/turet-11.png" alt="Application Image">
  <br>
  <em>Application Image – Bounding when the application sees an unarmed person</em>
</p>
<p align="center">
  <img src="/assets/post_images/turet/turet-12.png" alt="Application Image">
  <br>
  <em>Application Image – Bounding when the application sees an ARMED person</em>
</p>

---

## Differences from Other Solutions

* **Fully Local Processing:** No cloud; privacy and offline operation advantages.
* **Portable Integrated Design:** Can be added to various mobile platforms (drone/UGV).
* **Tracking Camera:** Active target tracking with 2-axis servos (unlike static security cameras).
* **Objective:** **Vehicle/robot situational awareness** rather than fixed-infrastructure security.
  Examples used for comparison: commercial systems like **SafePointe** and **Xtract One**.

---

## Challenges and Solutions

* **Insufficient servo current →** Added a dedicated **5V/1.5A** adapter, separated data lines, reduced noise.
* **Narrow field of view →** Extended with an external camera + rotatable turret.
* **Incompatible motion algorithm →** Switched from coordinate-based to **distance-based** control.
* **Image quality/model stability →** Balanced **temporary losses** using time tolerances (10 s).

---

## References

* Ultralytics YOLO (Raspberry Pi guide and reproducible results)
* SoundThinking – Stealth Weapons Detection
* Xtract One – AI Powered Weapon Detection System

---

## Conclusion

The **perception–decision–action** chain was implemented end-to-end: local threat detection with YOLOv8, transfer to the turret via a serial protocol, servo-based target tracking, and visual status indicators combined in a single module. The integration-oriented design provides **plug-and-play** flexibility for real systems (drone, UGV).
