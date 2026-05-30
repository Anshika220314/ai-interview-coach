from agents.resume_agent import (
    analyze_resume_agent
)

from agents.interview_agent import (
    interview_agent
)

from agents.feedback_agent import (
    feedback_agent
)

from agents.career_agent import (
    career_agent
)


def route_agent(
        agent_type,
        data
):

    if agent_type == "resume":
        return analyze_resume_agent(
            data["resume_text"]
        )

    elif agent_type == "interview":
        return interview_agent(
            data["context"],
            data["role"],
            data["company"],
            data["difficulty"]
        )

    elif agent_type == "feedback":
        return feedback_agent(
            data["question"],
            data["answer"]
        )

    elif agent_type == "career":
        return career_agent(
            data["resume_context"],
            data["target_role"]
        )

    return "Invalid agent type"