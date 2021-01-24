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
end
