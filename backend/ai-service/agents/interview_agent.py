from model_config import model

def interview_agent(
        context,
        role,
        company,
        difficulty
):
    prompt = f"""
    You are an Interview Generator Agent.

    Resume Context:
    {context}

    Role:
    {role}

    Company:
    {company}

    Difficulty:
    {difficulty}

    Generate:
    - technical questions
    - HR questions
    - project questions
    - system design questions
    """

    response = model.generate_content(prompt)
    return response.text