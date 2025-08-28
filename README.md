# Tweet-Generator-Agent

A simple, user-friendly web application that leverages the power of the **Google Gemini API** to generate creative and engaging tweets based on a 
specified topic, tone, and audience. It includes features to automatically generate relevant hashtags and even summarize or expand existing tweets.

---

### ✨ Features

* **Dynamic Tweet Generation:** Create unique tweets by providing a topic and selecting the desired tone and audience.
* **Intelligent Hashtag Suggestions:** Automatically generate a list of popular and relevant hashtags with a single click.
* **Tweet Manipulation:** Modify a generated tweet by either summarizing it for brevity or expanding it for more detail, all powered by AI.
* **Robust API Handling:** The application includes a custom `callApi` function with **exponential backoff**, ensuring reliable retries and better handling of rate-limit errors from the Gemini API.
* **Clean and Responsive UI:** Built with **Tailwind CSS** for a modern and mobile-friendly design.
* **Custom Notifications:** Uses a custom message box for user feedback, replacing standard browser alerts.

---

### 🧠 Agentic AI Summary

This project uses the Gemini model in a simple, agent-like manner. Each button click triggers a specific, specialized AI function, effectively creating a suite of user-directed "agents" for different tasks: one for generating tweets, another for suggesting hashtags, and a third for transforming text (summarizing or expanding). This modular approach allows the AI to act as a powerful, multi-purpose tool under direct human control.

---

### 🛠️ Technologies Used

* **HTML5:** For the application's structure.
* **Tailwind CSS:** For fast and efficient styling.
* **JavaScript (ES6+):** For the core application logic and API interactions.
* **Google Gemini API:** The generative AI model behind all the tweet and hashtag creation.

---

### ⚙️ Installation & Setup

To get a local copy up and running, follow these simple steps.

#### Prerequisites

* A web browser
* A **Google Gemini API Key** (you can get one from the [Google AI Studio](https://aistudio.google.com/app/apikey))

#### Setup

1.  Clone the repository to your local machine:
    ```bash
    git clone [https://github.com/your-username/tweet-generator-agent.git](https://github.com/your-username/tweet-generator-agent.git)
    ```
2.  Navigate into the project directory:
    ```bash
    cd tweet-generator-agent
    ```
3.  Open the `script.js` file in your favorite code editor.
4.  Replace the placeholder text `" Enter your Gemini API key here "` with your actual API key. The line should look like this:
    ```javascript
    const apiKey = "YOUR_API_KEY_HERE";
    ```
5.  Open the `index.html` file in your web browser.

---

### 💻 How to Use

1.  **Enter a Topic:** Type the subject you want the tweet to be about into the `Topic` field.
2.  **Customize:** Choose a `Tone` and specify your `Audience`.
3.  **Generate Hashtags:** Click the **Generate Hashtags** button to get a list of relevant hashtags.
4.  **Generate Tweet:** Click **Generate Tweet** to see the AI-generated tweet appear in the output box.
5.  **Refine (Optional):** Use the **Summarize** or **Expand** buttons to modify the generated tweet as needed.
6.  **Clear:** Click **Clear** to reset the output and start over.

---

### 🤝 Contributing

Contributions are what make the open-source community an incredible place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---
### Outputs-

## output-1:

<img width="1095" height="619" alt="output-1" src="https://github.com/user-attachments/assets/652bbdc8-a37c-42e2-b7f3-cba180d67c42" />

## output-2:

<img width="935" height="766" alt="output-2" src="https://github.com/user-attachments/assets/87889280-67d1-48ee-a14c-910dda0510de" />

---

### 📄 License

This project is licensed under the Unlicense - see the `LICENSE.md` file for details.
