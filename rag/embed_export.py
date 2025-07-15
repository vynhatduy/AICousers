# for vi data

# import json
# import os
# import time
# from dotenv import load_dotenv
# from openai import OpenAI, OpenAIError
# from openai.types import CreateEmbeddingResponse

# # === Load API Key & model ===
# load_dotenv()
# api_key = os.getenv("OPENAI_API_KEY")
# embedding_model = os.getenv("EMBEDDING_MODEL", "text-embedding-ada-002")

# client = OpenAI(api_key=api_key)

# # === Cấu hình ===
# INPUT_FILE = "data_vi.json"
# OUTPUT_VECTOR_FILE = "vectors_vi.json"
# OUTPUT_CHUNK_FILE = "chunks_vi.json"

# # === Hàm tạo embedding ===
# def get_embedding(text: str) -> list[float]:
#     while True:
#         try:
#             response: CreateEmbeddingResponse = client.embeddings.create(
#                 input=text,
#                 model=embedding_model,
#             )
#             return response.data[0].embedding
#         except OpenAIError as e:
#             print(f"OpenAI API error: {e}")
#             return [0.0] * 1536

# # === Hàm tách đoạn (giữ nguyên như bạn viết) ===
# def extract_chunks(data: dict) -> list[str]:
#     chunks = []
#     # [Phần còn lại giữ nguyên không đổi...]
#     # Courses
#     for item in data.get("courses", []):
#         chunks.append(f"Khóa học: {item['title']}\nMô tả: {item['description']}")
#     # ...
#     return chunks

# # === Main ===
# if __name__ == "__main__":
#     print("🔍 Đang tải dữ liệu...")
#     with open(INPUT_FILE, "r", encoding="utf-8") as f:
#         data = json.load(f)

#     chunks = extract_chunks(data)
#     print(f"📄 Tổng số đoạn: {len(chunks)}")

#     vectors = []
#     for i, chunk in enumerate(chunks):
#         print(f"🧠 Tạo embedding cho đoạn {i + 1}/{len(chunks)}")
#         vector = get_embedding(chunk)
#         vectors.append(vector)

#     print("💾 Đang lưu vectors.json và chunks.json...")
#     with open(OUTPUT_VECTOR_FILE, "w", encoding="utf-8") as f:
#         json.dump(vectors, f)

#     with open(OUTPUT_CHUNK_FILE, "w", encoding="utf-8") as f:
#         json.dump(chunks, f, ensure_ascii=False)

#     print("✅ Hoàn tất! Vectors và chunks đã được lưu.")


#for en data
import json
import os
import time
from dotenv import load_dotenv
from openai import OpenAI, OpenAIError
from openai.types import CreateEmbeddingResponse

# === Load API Key & model ===
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
embedding_model = os.getenv("EMBEDDING_MODEL", "text-embedding-3-small")

client = OpenAI(api_key=api_key)

# === Config ===
INPUT_FILE = "data_en.json"
OUTPUT_VECTOR_FILE = "vectors_en.json"
OUTPUT_CHUNK_FILE = "chunks_en.json"

# === Embedding function ===
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

# === Chunk extraction for English ===
def extract_chunks(data: dict) -> list[str]:
    chunks = []

    for item in data.get("courses", []):
        chunks.append(f"Course: {item['title']}\nDescription: {item['description']}")

    for item in data.get("faq", []):
        chunks.append(f"Q: {item['question']}\nA: {item['answer']}")

    for item in data.get("benefit", []):
        chunks.append(f"Benefit: {item['title']}\nDetails: {item['description']}")

    for office in data.get("office", []):
        chunks.append(f"Office: {office}")

    for key in ["mission", "coreValues", "practicalTraining", "registrationInstructions", "whenCompleted"]:
        if value := data.get(key):
            chunks.append(f"{key.replace('_', ' ').capitalize()}: {value}")

    for educator in data.get("educators", {}).get("educatorList", []):
        certs = ", ".join(educator.get("certificate", []))
        chunks.append(f"Educator: {educator['name']}\nCertificates: {certs}")

    for mentor in data.get("educators", {}).get("mentors", []):
        certs = ", ".join(mentor.get("certificate", []))
        chunks.append(f"Mentor: {mentor['name']}\nCertificates: {certs}")

    for feedback in data.get("studentFeedback", []):
        chunks.append(f"Student: {feedback['name']}\nFeedback: {feedback['description']}")

    if data.get("introduction"):
        chunks += data["introduction"]

    if data.get("courseRoadmap"):
        for item in data["courseRoadmap"]:
            chunks.append(f"Roadmap: {item['title']}\n{item['description']}")

    for learner in data.get("targetLearners", []):
        chunks.append(f"Target learner: {learner}")

    if fee := data.get("fee"):
        chunks.append(f"Tuition: Original price: {fee.get('OriginalPrice')}, Discounted: {fee.get('PriceReducedTo')}")

    if contact := data.get("contactInformation", {}).get("contact"):
        chunks.append("Contact info: " + ", ".join(contact))

    if other := data.get("other"):
        for item in other:
            chunks.append(f"Count: {item['quantity']} - {item['description']}")

    if name := data.get("yourName"):
        chunks.append(f"Assistant name: {name}")

    if website := data.get("website"):
        chunks.append(f"Website: {website}")

    return chunks

# === Main ===
if __name__ == "__main__":
    print("🔍 Loading data...")
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    chunks = extract_chunks(data)
    print(f"📄 Total chunks: {len(chunks)}")

    vectors = []
    for i, chunk in enumerate(chunks):
        print(f"🧠 Generating embedding for chunk {i + 1}/{len(chunks)}")
        vector = get_embedding(chunk)
        vectors.append(vector)

    print("💾 Saving vectors_en.json and chunks_en.json...")
    with open(OUTPUT_VECTOR_FILE, "w", encoding="utf-8") as f:
        json.dump(vectors, f)

    with open(OUTPUT_CHUNK_FILE, "w", encoding="utf-8") as f:
        json.dump(chunks, f, ensure_ascii=False)

    print("✅ Done! English vectors and chunks saved.")
