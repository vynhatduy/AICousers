import json
import os
import time
from dotenv import load_dotenv
from openai import OpenAI, OpenAIError
from openai.types import CreateEmbeddingResponse

# # === Load API Key & model ===
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
embedding_model = os.getenv("EMBEDDING_MODEL", "text-embedding-3-small")

client = OpenAI(api_key=api_key)

# # === Config ===
INPUT_FILE = "data_en.json"
OUTPUT_VECTOR_FILE = "vectors_en.json"
OUTPUT_CHUNK_FILE = "chunks_en.json"

# # === Embedding function ===
def get_embedding(text: str) -> list[float]:
    while True:
        try:
            response: CreateEmbeddingResponse = client.embeddings.create(
                input=text,
                model=embedding_model,
            )
            return response.data[0].embedding
        except OpenAIError as e:
            print(f"OpenAI API error: {e}")
            return [0.0] * 1536

# # === Chunk extraction for English ===
def extract_chunks(data: dict) -> list[str]:
    chunks = []

    # === General info ===
    general = data.get("general", {})
    if general.get("website"):
        chunks.append(f"Website: {general['website']}")
    if general.get("assistantName"):
        chunks.append(f"Assistant name: {general['assistantName']}")
    if general.get("fee"):
        chunks.append(f"Tuition: Original price: {general['fee'].get('OriginalPrice')}, Discounted: {general['fee'].get('PriceReducedTo')}")
    if general.get("registrationInstructions"):
        chunks.append(f"Registration instructions: {general['registrationInstructions']}")
    if general.get("mission"):
        chunks.append(f"Mission: {general['mission']}")
    if general.get("coreValues"):
        chunks.append(f"Core values: {general['coreValues']}")
    if general.get("practicalTraining"):
        chunks.append(f"Practical training: {general['practicalTraining']}")
    if general.get("whenCompleted"):
        chunks.append(f"When completed: {general['whenCompleted']}")

    # === Contact info ===
    contact = data.get("contact", {})
    if contacts := contact.get("contacts"):
        chunks.append("Contact info: " + ", ".join(contacts))
    if offices := contact.get("offices"):
        for office in offices:
            chunks.append(f"Office: {office}")

    # === Introduction ===
    for intro in data.get("introduction", []):
        chunks.append(f"Introduction: {intro}")

    # === Target learners ===
    for learner in data.get("targetLearners", []):
        chunks.append(f"Target learner: {learner}")

    # === Courses ===
    for course in data.get("courses", []):
        chunks.append(f"Course: {course['title']}\nDescription: {course['description']}")

    # === Educators ===
    for educator in data.get("educators", {}).get("educatorList", []):
        certs = ", ".join(educator.get("certificate", []))
        chunks.append(f"Educator: {educator['name']}\nCertificates: {certs}")
    for mentor in data.get("educators", {}).get("mentorList", []):
        certs = ", ".join(mentor.get("certificate", []))
        chunks.append(f"Mentor: {mentor['name']}\nCertificates: {certs}")

    # === Student feedback ===
    for feedback in data.get("studentFeedback", []):
        chunks.append(f"Student: {feedback['name']}\nFeedback: {feedback['description']}")

    # === FAQ ===
    for item in data.get("faq", []):
        chunks.append(f"Q: {item['question']}\nA: {item['answer']}")

    # === Course roadmap ===
    for item in data.get("courseRoadmap", []):
        chunks.append(f"Roadmap: {item['title']}\n{item['description']}")

    # === Benefits ===
    for item in data.get("benefits", []):
        chunks.append(f"Benefit: {item['title']}\nDetails: {item['description']}")

    # === Stats ===
    for item in data.get("stats", []):
        chunks.append(f"Statistic: {item['quantity']} - {item['description']}")

    return chunks

# # === Main ===
if __name__ == "__main__":
    print("Loading data...")
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    chunks = extract_chunks(data)
    print(f"Total chunks: {len(chunks)}")

    vectors = []
    for i, chunk in enumerate(chunks):
        print(f"Generating embedding for chunk {i + 1}/{len(chunks)}")
        vector = get_embedding(chunk)
        vectors.append(vector)

    print("Saving vectors_en.json and chunks_en.json...")
    with open(OUTPUT_VECTOR_FILE, "w", encoding="utf-8") as f:
        json.dump(vectors, f)

    with open(OUTPUT_CHUNK_FILE, "w", encoding="utf-8") as f:
        json.dump(chunks, f, ensure_ascii=False)

    print("Done! English vectors and chunks saved.")
