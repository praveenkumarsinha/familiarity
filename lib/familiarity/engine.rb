module Familiarity
  class Engine < ::Rails::Engine
    isolate_namespace Familiarity

    #initializer 'my_engine.action_controller' do |app|
    #  ActiveSupport.on_load :action_controller do
    #    helper Familiarity::ApplicationHelper
    #  end
    #end
  end

  class Railtie < ::Rails::Railtie
    initializer "familiarity.view_helpers" do
      ActionView::Base.send :include, Familiarity::ApplicationHelper
    end
  end
end
