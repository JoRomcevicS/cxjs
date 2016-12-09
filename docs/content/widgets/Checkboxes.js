import { HtmlElement, Checkbox, Repeater } from 'cx/widgets';
import { Content, Controller, LabelsLeftLayout } from 'cx/ui';
import {Md} from '../../components/Md';
import {CodeSplit} from '../../components/CodeSplit';
import {CodeSnippet} from '../../components/CodeSnippet';
import {ConfigTable} from '../../components/ConfigTable';
import {ImportPath} from '../../components/ImportPath';

import configs from './configs/Checkbox';

class CbController extends Controller {
    init() {
        var options = Array.from({length: 5}).map((v, i) => ({id: i, text: `Option ${i + 1}`}));
        this.store.set('$page.options', options);
    }
}

export const Checkboxes = <cx>
    <Md>
        # Checkbox

      <ImportPath path={"import {Checkbox} from 'cx/ui/form/Checkbox';"} />

      Checkbox is a commonly used widget for expressing binary choices.

      <CodeSplit>

            <div class="widgets">
                <div layout={LabelsLeftLayout}>
                    <Checkbox label="Native" value:bind="$page.checked" text="Checkbox" native/>
                    <Checkbox label="Standard" value:bind="$page.checked" text="Checkbox"/>
                    <Checkbox label="Disabled" value:bind="$page.checked" disabled text="Checkbox"/>
                    <Checkbox label="Readonly" value:bind="$page.checked" readOnly text="Checkbox"/>
                </div>
                <div layout={LabelsLeftLayout}>
                    <Checkbox label="Required" value:bind="$page.checked" required text="Checkbox"/>
                    <Checkbox label="Styled" value:bind="$page.checked" inputStyle="color:red" text="Checkbox"/>
                    <Checkbox label="View" value:bind="$page.checked" mode="view" text="Checkbox"/>
                    <Checkbox label="EmptyText" value:bind="$page.checked" mode="view" text="Checkbox" emptyText="N/A"/>
                </div>
            </div>

            <Content name="code">
                <CodeSnippet>{`
                <div layout={LabelsLeftLayout}>
                    <Checkbox label="Native" value:bind="$page.checked" text="Checkbox" native/>
                    <Checkbox label="Standard" value:bind="$page.checked" text="Checkbox" />
                    <Checkbox label="Disabled" value:bind="$page.checked" disabled text="Checkbox" />
                    <Checkbox label="Readonly" value:bind="$page.checked" readOnly text="Checkbox" />
                </div>
                <div layout={LabelsLeftLayout}>
                    <Checkbox label="Required" value:bind="$page.checked" required text="Checkbox" />
                    <Checkbox label="Styled" value:bind="$page.checked" inputStyle="color:red" text="Checkbox"/>
                    <Checkbox label="View" value:bind="$page.checked" mode="view" text="Checkbox" />
                    <Checkbox label="EmptyText" value:bind="$page.checked" mode="view" text="Checkbox" emptyText="N/A" />
                </div>
            `}</CodeSnippet>
            </Content>
        </CodeSplit>

        ## Configuration

        <ConfigTable props={configs}/>

        ## Examples

        <CodeSplit>

            ### Repeater

            Checkbox is commonly combined with a `Repeater` when list of choices is variable.

            <div class="widgets">
                <div controller={CbController}>
                    <Repeater records:bind="$page.options">
                        <Checkbox value:bind="$record.checked" text:bind="$record.text"/>
                        <br/>
                    </Repeater>
                </div>
            </div>

            Please note that in order to avoid multiple instances controller should not be assigned to the repeater.

            <Content name="code">
                <CodeSnippet>{`
               class CbController extends Controller {
                  init() {
                     var options = Array.from({length: 5}).map((v, i) => ({ id: i, text: \`Option \${i + 1}\` }));
                     this.store.set('$page.options', options);
                  }
               }
               ...
               <div controller={CbController}>
                  <Repeater records:bind="$page.options">
                     <Checkbox value:bind="$record.checked" text:bind="$record.text" />
                     <br/>
                  </Repeater>
               </div>
            `}</CodeSnippet>
            </Content>
        </CodeSplit>

    </Md>
</cx>