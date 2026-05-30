from model_config import model

def analyze_resume_agent(resume_text):
    prompt = f"""
    You are a Resume Analyzer Agent.

    Analyze the resume professionally.

    Provide:
    - ATS score
    - strengths
    - weaknesses
    - improvement suggestions

    Resume:
    {resume_text}
    """

    response = model.generate_content(prompt)
    return response.text