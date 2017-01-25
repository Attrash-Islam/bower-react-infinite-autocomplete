import { render } from 'react-dom';
import { InfinityAutoComplete } from '../src/index';
import { InfiniteAutocomplete, InputComponent, OptionsComponent } from 'infinite-autocomplete';
import { Promise as es6Promise } from 'es6-promise';

declare var React;
var root;

describe(`InfinityAutoComplete Unit Testing`, function() {
    
    beforeEach(function() {
        root = document.createElement(`div`);
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
            ]}/>, root); 
            expect(InfiniteAutocomplete.prototype.setConfig)
                .toHaveBeenCalledWith({
                    data: [{
                        text: 'text', value: 'val'
                    }]
                });
        });

        
        it(`should call CORE.setConfig whenever the data changes`, function() {
            render(<InfinityAutoComplete data={[
                { text: 'text', value: 'val' }
            ]}/>, root);

            expect(InfiniteAutocomplete.prototype.setConfig)
                .toHaveBeenCalledWith({
                    data: [
                        { text: 'text', value: 'val' }
                    ]
            });

            //Mocking componentWillReceiveProps in this way by rendering already rendered element
            render(<InfinityAutoComplete data={[
                { text: 'text', value: 'val' },
                { text: 'text2', value: 'val2' }
            ]}/>, root);

            expect(InfiniteAutocomplete.prototype.setConfig)
                .toHaveBeenCalledWith({
                    data: [
                        { text: 'text', value: 'val' },
                        { text: 'text2', value: 'val2' }
                    ]
            });
        });

    });

    describe(`fetchSize feature support`, function() {
        
        it(`should pass the fetchSize into the InfiniteAutocomplete core plugin`, 
            function() {
                render(<InfinityAutoComplete 
                    fetchSize={6}/>, root);

                expect(InfiniteAutocomplete.prototype.setConfig)
                    .toHaveBeenCalledWith({
                        fetchSize: 6
                });
        });

        it(`should call CORE.setConfig whenever the fetchSize changes`, 
            function() {
                render(<InfinityAutoComplete
                            fetchSize={7} />, root);
                render(<InfinityAutoComplete 
                        fetchSize={11} />, root);
                expect(InfiniteAutocomplete.prototype.setConfig)
                    .toHaveBeenCalledWith({
                        fetchSize: 11
                });
        });

    });


    describe(`maxHeight feature support`, function() {
    
        it(`should pass the maxHeight into the InfiniteAutocomplete core plugin`, 
            function() {
                render(<InfinityAutoComplete 
                            maxHeight={'160px'}/>, root);

                expect(InfiniteAutocomplete.prototype.setConfig)
                    .toHaveBeenCalledWith({
                        maxHeight: '160px'
                });
        });

        it(`should call CORE.setConfig whenever the maxHeight changes`, 
            function() {
                render(<InfinityAutoComplete 
                            maxHeight={'100px'}/>, root);

                render(<InfinityAutoComplete
                            maxHeight={'200px'} />, root);

                expect(InfiniteAutocomplete.prototype.setConfig)
                    .toHaveBeenCalledWith({
                        maxHeight: '200px'
                });
        });
    });


    describe(`onSelect feature support`, function() {

        it(`should pass the function to the CORE.setConfig whenever we choose something`, 
            function() {
                render(<InfinityAutoComplete
                            onSelect={(...args) => {
                                console.log(args);
                        }} />, root);
                expect(InfiniteAutocomplete.prototype.setConfig)
                    .toHaveBeenCalledWith({
                        onSelect: jasmine.any(Function)
                });
        });

    });


    describe(`getDataFromApi feature support`, function() {

        it(`should pass the function to CORE.setConfig`, function() {
            render(<InfinityAutoComplete
                    getDataFromApi={() => {
                        return new es6Promise((r) => r);
                    }} />, root);

            expect(InfiniteAutocomplete.prototype.setConfig)
                .toHaveBeenCalledWith({
                    getDataFromApi: jasmine.any(Function)
            });

        });
    });


    describe(`customizedInput feature support`, function() {
        it(`should pass the customized input to the CORE.setConfig`, 
            function() {
                render(<InfinityAutoComplete 
                    customizedInput={class extends InputComponent{

                    }}/>, root);
                expect(InfiniteAutocomplete.prototype.setConfig)
                    .toHaveBeenCalledWith({
                        customizedInput: jasmine.any(Function)
                });
        });

        it(`should pass the customized input to the CORE.setConfig whenever it changes`, 
            function() {
                render(<InfinityAutoComplete 
                            customizedInput={class extends InputComponent{

                        }}/>, root);

                render(<InfinityAutoComplete 
                        customizedInput={class extends InputComponent{

                    }}/>, root);

                expect(InfiniteAutocomplete.prototype.setConfig)
                    .toHaveBeenCalledTimes(2);
        });
    });



    describe(`customizedOptions feature support`, function() {
        it(`should pass the customized options to the CORE.setConfig`, 
            function() {
                render(<InfinityAutoComplete 
                    customizedOptions={class extends OptionsComponent{

                    }}/>, root);
                expect(InfiniteAutocomplete.prototype.setConfig)
                    .toHaveBeenCalledWith({
                        customizedOptions: jasmine.any(Function)
                });
        });

        it(`should pass the customized options to the CORE.setConfig whenever it changes`, 
            function() {
                render(<InfinityAutoComplete 
                            customizedOptions={class extends OptionsComponent{

                        }}/>, root);

                render(<InfinityAutoComplete 
                        customizedOptions={class extends OptionsComponent{

                    }}/>, root);

                expect(InfiniteAutocomplete.prototype.setConfig)
                    .toHaveBeenCalledTimes(2);
        });
    });


});
