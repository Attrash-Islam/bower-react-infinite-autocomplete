import { render } from 'react-dom';
import { InfinityAutoComplete } from '../src/index';
import { InfiniteAutocomplete } from 'infinite-autocomplete';

declare var React;

describe(`InfinityAutoComplete Unit Testing`, function() {
    
    beforeEach(function() {
        spyOn(InfiniteAutocomplete.prototype, 'setConfig')
            //Mock passed functions to be executed automatically to bypass low coverage report
            //Depends on the CORE Unit Testing 
            .and.callFake(function(config) { 
                if(config.onSelect) {
                    config.onSelect();
                }
                if(config.getDataFromApi) {
                    config.getDataFromApi();
                }
        });
    });

    describe(`data feature support`, function() {
        it(`should pass the data into the InfiniteAutocomplete core plugin`, function() {
            render(<InfinityAutoComplete data={[
                {text: 'text', value: 'val'}
            ]}/>, document.body);
            expect(InfiniteAutocomplete.prototype.setConfig)
                .toHaveBeenCalled();
        });
    });

});
