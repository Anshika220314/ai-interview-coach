from model_config import model


def career_agent(
        resume_context,
        target_role
):

    prompt = f"""
    You are a Career Advisor Agent.

    Resume Context:
    {resume_context}

    Target Role:
    {target_role}

    Suggest:
    - missing skills
    - learning roadmap
    - certifications
    - project ideas
    - career improvements
    """

    response = model.generate_content(prompt)

    return response.text