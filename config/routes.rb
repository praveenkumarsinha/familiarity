Familiarity::Engine.routes.draw do
  resources :familiarities do
    collection do
      post 'save'
    end
  end
end
