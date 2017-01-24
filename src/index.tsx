import * as React from 'react';
import { InfiniteAutocomplete } from 'infinite-autocomplete';

/**
 * InfinityAutoComplete React Component
 * @extends React.Component
 * @author Islam Attrash
 */
export class InfinityAutoComplete extends React.Component<any, any> {

    /**
     * Base element for the infinite-autocomplete
     */
    private baseElement:HTMLElement;
    /**
     * The plugin instance
     */
    private plugin:InfiniteAutocomplete;


    /**
     * InfinityAutoComplete Component constructor
     * @param props
     */
    constructor(props) {
        super(props);
    }


    /**
     * componentDidMount lifecycle hook
     */
    componentDidMount() {
      this.plugin = new InfiniteAutocomplete(this.baseElement);
      this.init();
    }


    /**
     * Set the data infinite-autocomplete configuration
     * @param data - Array of IOptions
     */
    private setData(data) {
        this.plugin.setConfig({
            data
        });
    }

    /**
     * Set the fetchSize infinite-autocomplete configuration
     * @param fetchSize - Chunk size
     */
    private setFetchSize(fetchSize) {
        this.plugin.setConfig({
            fetchSize
        });
    }


    /**
     * Set the maxHeight infinite-autocomplete configuration
     * @param maxHeight - Max height
     */
    private setMaxHeight(maxHeight) {
        this.plugin.setConfig({
            maxHeight
        });
    }


    /**
     * Set the customizedInput infinite-autocomplete configuration
     * @param customizedInput - Customized input
     */
    private setCustomizedInput(customizedInput) {
        this.plugin.setConfig({
            customizedInput
        });
    }


    /**
     * Set the customizedOptions infinite-autocomplete configuration
     * @param customizedOptions - Customized options
     */
    private setCustomizedOptions(customizedOptions) {
        this.plugin.setConfig({
            customizedOptions
        });
    }


    /**
     * initializing method
     */
    private init() {
        
        if(this.props.data) {
            this.setData(this.props.data);
        }

        
        if(this.props.fetchSize) {
            this.setFetchSize(this.props.fetchSize);
        }

        if(this.props.maxHeight) {
            this.setMaxHeight(this.props.maxHeight);
        }

        if(this.props.customizedInput) {
            this.setCustomizedInput(this.props.customizedInput);
        }

        if(this.props.customizedOptions) {
            this.setCustomizedOptions(this.props.customizedOptions);
        }

        if(this.props.onSelect) {
            this.plugin.setConfig({
                onSelect: (element, data) => {
                    this.props.onSelect(element, data);
                }
            });
        }

        if(this.props.getDataFromApi) {
            this.plugin.setConfig({
                getDataFromApi: (text, page, fetchSize) => {
                    return this
                                .props
                                .getDataFromApi(text, page, fetchSize);
                }
            });
        }


    }

    
    /**
     * componentWillReceiveProps lifecycle hook
     * @param nextProps - Next properties
     */
    componentWillReceiveProps(nextProps:any) {

      if(nextProps.data && this.props.data !== nextProps.data) {
        this.setData(nextProps.data);
      }

      if(nextProps.fetchSize && this.props.fetchSize !== nextProps.fetchSize) {
        this.setFetchSize(nextProps.fetchSize);
      }

      if(nextProps.maxHeight && this.props.maxHeight !== nextProps.maxHeight) {
          this.setMaxHeight(nextProps.maxHeight);
      }
      
      if(nextProps.customizedInput && this.props.customizedInput !== nextProps.customizedInput) {
          this.setCustomizedInput(nextProps.customizedInput);
      }

      if(nextProps.customizedOptions && this.props.customizedOptions !== nextProps.customizedOptions) {
          this.setCustomizedOptions(nextProps.customizedOptions);
      }

    }

    /**
     * componentWillUnmount lifecycle hook
     */
    componentWillUnmount() {
        this.plugin.destroy();
    }


    /**
     * Render method
     * @returns string
     */
    render() {
        return <div ref={(base) => this.baseElement = base }></div>;
    }

}
