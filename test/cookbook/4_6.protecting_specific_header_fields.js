module.exports = {
  title: 'Protecting Specific Header Fields',
  reproducible: true,
  input: {
    payload: 'It’s a dangerous business, Frodo, going out your door. You step onto the road, and if you don\'t keep your feet, there’s no knowing where you might be swept off to.',
    key: {
      kty: 'oct',
      kid: '018c0ae5-4d9b-471b-bfd6-eef314bc7037',
      use: 'sig',
      alg: 'HS256',
      k: 'hJtXIZ2uSN5kbQfbtTNWbpdmhkV8FJG-Onbc6mxCcYg'
    },
    alg: 'HS256'
  },
  signing: {
    'protected': {
      alg: 'HS256'
    },
    protected_b64u: 'eyJhbGciOiJIUzI1NiJ9',
    unprotected: {
      kid: '018c0ae5-4d9b-471b-bfd6-eef314bc7037'
    },
    'sig-input': 'eyJhbGciOiJIUzI1NiJ9.SXTigJlzIGEgZGFuZ2Vyb3VzIGJ1c2luZXNzLCBGcm9kbywgZ29pbmcgb3V0IHlvdXIgZG9vci4gWW91IHN0ZXAgb250byB0aGUgcm9hZCwgYW5kIGlmIHlvdSBkb24ndCBrZWVwIHlvdXIgZmVldCwgdGhlcmXigJlzIG5vIGtub3dpbmcgd2hlcmUgeW91IG1pZ2h0IGJlIHN3ZXB0IG9mZiB0by4',
    sig: 'bWUSVaxorn7bEF1djytBd0kHv70Ly5pvbomzMWSOr20'
  },
  output: {
    json: {
      payload: 'SXTigJlzIGEgZGFuZ2Vyb3VzIGJ1c2luZXNzLCBGcm9kbywgZ29pbmcgb3V0IHlvdXIgZG9vci4gWW91IHN0ZXAgb250byB0aGUgcm9hZCwgYW5kIGlmIHlvdSBkb24ndCBrZWVwIHlvdXIgZmVldCwgdGhlcmXigJlzIG5vIGtub3dpbmcgd2hlcmUgeW91IG1pZ2h0IGJlIHN3ZXB0IG9mZiB0by4',
      signatures: [
        {
          'protected': 'eyJhbGciOiJIUzI1NiJ9',
          header: {
            kid: '018c0ae5-4d9b-471b-bfd6-eef314bc7037'
          },
          signature: 'bWUSVaxorn7bEF1djytBd0kHv70Ly5pvbomzMWSOr20'
        }
      ]
    },
    json_flat: {
      payload: 'SXTigJlzIGEgZGFuZ2Vyb3VzIGJ1c2luZXNzLCBGcm9kbywgZ29pbmcgb3V0IHlvdXIgZG9vci4gWW91IHN0ZXAgb250byB0aGUgcm9hZCwgYW5kIGlmIHlvdSBkb24ndCBrZWVwIHlvdXIgZmVldCwgdGhlcmXigJlzIG5vIGtub3dpbmcgd2hlcmUgeW91IG1pZ2h0IGJlIHN3ZXB0IG9mZiB0by4',
      'protected': 'eyJhbGciOiJIUzI1NiJ9',
      header: {
        kid: '018c0ae5-4d9b-471b-bfd6-eef314bc7037'
      },
      signature: 'bWUSVaxorn7bEF1djytBd0kHv70Ly5pvbomzMWSOr20'
    }
  }
}
