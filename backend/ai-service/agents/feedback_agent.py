from model_config import model


def feedback_agent(question, answer):

    prompt = f"""
    You are a Feedback Evaluation Agent.

    Interview Question:
    {question}

    Candidate Answer:
    {answer}

    Evaluate:
    - technical accuracy
    - communication
    - missing concepts
    - improvements
    """

    response = model.generate_content(prompt)

    return response.text