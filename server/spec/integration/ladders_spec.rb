# frozen_string_literal: true

require 'swagger_helper'

describe 'Ladder API' do
  let(:id) { Ladder.create(name: 'foo', desc: 'foo too').id }
  path '/api/ladders/{id}' do
    get 'Retrieves an ladder' do
      tags 'Ladders'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer
      response '200', 'ladder found' do
        schema '$ref' => '#/components/schemas/ladder'
        run_test!
      end
    end
  end
  path '/api/ladders' do
    get 'Retrieves all ladders' do
      tags 'Ladders'
      produces 'application/json'
      response '200', 'ladders found' do
        schema '$ref' => '#/components/schemas/ladder'
        let(:id) { Ladder.create(name: 'foo', desc: 'foo too').id }
        run_test!
      end
    end
  end
end
