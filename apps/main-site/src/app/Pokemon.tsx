import React from 'react'
import Image from 'next/image'

import { useState, useEffect } from 'react'

interface Pokemon {
  name: string
  sprites: {
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
}

const cache = new Map()

export default function Pokemon({ id }: { id: number }) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  useEffect(() => {
    const fetchPokemon = async () => {
      if (cache.has(id)) {
        setPokemon(cache.get(id))
      } else {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id || 1}`
        )
        const data = await response.json()
        cache.set(id, data)
        setPokemon(data)
      }
    }

    fetchPokemon()
  }, [id])

  if (!pokemon) return <div>Loading...</div>

  return (
    <div className='text-3xl'>
      <Image
        src={pokemon.sprites.other['official-artwork'].front_default}
        alt={pokemon.name}
        width={200}
        height={200}
      />
    </div>
  )
}
