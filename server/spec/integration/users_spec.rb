require 'swagger_helper'

describe 'Users API' do
  path '/api/users' do
    post 'Creates a user' do
      tags 'Users'
      consumes 'application/json'
      parameter in: :body, schema: {
        type: :object,
        properties: {
          nickname: { type: :string}
        },
        required: ['nickname']
      }
      response '201', 'user created' do
        let(:user) {{ nickname: 'foo', content: 'bar'}}
        run_test!
      end
      response '422', 'invalid request' do
        let(:user) {{}}
        run_test!
      end

    end
  end
  path '/api/users/{id}' do
    get 'Retrieves an user' do
      tags 'Users'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer
      response '200', 'user found' do
        schema type: :object,
               properties: {
                 id: { type: :integer },
                 avatar: { type: :string },
                 guild_id: { type: :integer },
                 status_id: { type: :integer},
                 ladder_id: { type: :integer},
                 two_factor: { type: :boolean},
                 nickname: { type: :string }
               },
               required: [ 'nickname', 'avatar', 'guild_id', 'status_id', 'ladder_id', 'two_factor' ]
        let(:id) { User.create(nickname: 'foo').id }
        run_test!
      end
    end
  end
end
