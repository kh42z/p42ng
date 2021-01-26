require 'swagger_helper'

RSpec.describe 'api/ladders', type: :request do
  path '/api/ladders/{id}' do
    get 'Retrieves an ladder' do
      tags 'Ladders'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer
      response '200', 'ladder found' do
        schema '$ref' => '#/definitions/ladder'
        let(:id) { Ladder.create(name: 'foo', desc: 'foo too').id }
        run_test!
      end
    end
  end
  path '/api/ladders' do
    get 'Retrieves all ladders' do
      tags 'Ladders'
      produces 'application/json'
      response '200', 'ladders found' do
        schema '$ref' => '#/definitions/ladder'
        let(:id) { Ladder.create(name: 'foo', desc: 'foo too').id }
        run_test!
      end
    end
  end
end
