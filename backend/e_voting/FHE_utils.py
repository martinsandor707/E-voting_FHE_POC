from lightphe import LightPHE

algorithms = [
  "RSA",
  "ElGamal",
  "Exponential-ElGamal",
  "Paillier",
  "Damgard-Jurik",
  "Okamoto-Uchiyama",
  "Benaloh",
  "Naccache-Stern",
  "Goldwasser-Micali",
  "EllipticCurve-ElGamal"
]

cs = LightPHE(algorithm_name = algorithms[3])

# define plaintext
m = 17

# calculate ciphertext
c = cs.encrypt(m)
print(f"Kulcsok: {c.keys}")
print(f"Eredeti üzenet: {m}\nTitkosított: {c.value}\nVisszafejtve: {cs.decrypt(c)}")