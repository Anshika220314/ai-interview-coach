import faiss
import numpy as np

index = None
stored_chunks = []


def store_embeddings(chunks, embeddings):

    global index
    global stored_chunks

    dimension = len(embeddings[0])

    index = faiss.IndexFlatL2(dimension)

    index.add(np.array(embeddings))

    stored_chunks = chunks


def search(query_embedding, top_k=3):

    distances, indices = index.search(
        np.array([query_embedding]),
        top_k
    )

    results = []

    for idx in indices[0]:
        results.append(stored_chunks[idx])

    return results