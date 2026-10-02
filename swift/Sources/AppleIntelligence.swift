import Foundation
import FoundationModels
import RaycastSwiftMacros

struct ChatMessage: Codable {
  let role: String
  let content: String
}

struct ModelError: Error, CustomStringConvertible {
  let description: String
}

/// Runs a single prompt against Apple's on-device model.
@raycast func generate(prompt: String, instructions: String, temperature: Double?) async throws -> String {
  try ensureAvailable()

  let session = LanguageModelSession(instructions: instructions)
  let options = GenerationOptions(temperature: temperature)

  do {
    let response = try await session.respond(to: prompt, options: options)
    return response.content
  } catch let error as LanguageModelSession.GenerationError {
    throw ModelError(description: describe(error))
  }
}

/// Continues a conversation. The history is replayed in the prompt, since each call runs in a new process.
@raycast func chat(messages: [ChatMessage], instructions: String) async throws -> String {
  guard let last = messages.last, last.role == "user" else {
    throw ModelError(description: "The conversation must end with a user message.")
  }

  let history = messages.dropLast()
    .map { "\($0.role == "user" ? "User" : "Assistant"): \($0.content)" }
    .joined(separator: "\n\n")

  let prompt =
    history.isEmpty
    ? last.content
    : """
    Conversation so far:
    \(history)

    User: \(last.content)
    """

  return try await generate(prompt: prompt, instructions: instructions, temperature: nil)
}

private func ensureAvailable() throws {
  if case .unavailable(let reason) = SystemLanguageModel.default.availability {
    throw ModelError(description: describe(reason))
  }
}

private func describe(_ reason: SystemLanguageModel.Availability.UnavailableReason) -> String {
  switch reason {
  case .deviceNotEligible:
    return "This Mac doesn't support Apple Intelligence."
  case .appleIntelligenceNotEnabled:
    return "Apple Intelligence is turned off. Turn it on in System Settings → Apple Intelligence & Siri."
  case .modelNotReady:
    return "The Apple Intelligence model is still downloading. Try again in a few minutes."
  @unknown default:
    return "Apple Intelligence isn't available on this Mac."
  }
}

private func describe(_ error: LanguageModelSession.GenerationError) -> String {
  switch error {
  case .exceededContextWindowSize:
    return "The text is too long for the on-device model. Select less text and try again."
  case .guardrailViolation:
    return "Apple Intelligence declined to respond to this text."
  case .unsupportedLanguageOrLocale:
    return "Apple Intelligence doesn't support this language yet."
  case .rateLimited:
    return "Apple Intelligence is busy. Try again in a moment."
  default:
    return error.localizedDescription
  }
}
