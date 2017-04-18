import Affix from './affix';
import Alert from './alert';
import Icon from './icon';
import Icon2 from './icon2';
import Button from './button';
import Input from './input';
import Switch from './switch';
import Table from './table';
import DatePicker from './date-picker';
import TimePicker from './time-picker';
import Page from './page';
import Form from './form';
import InputNumber from './input-number';
import {
    Select,
    Option,
    OptionGroup
} from './select';
import {
    Row,
    Col
} from './grid';

const components = {
    Affix,
    Alert,
    Icon,
    Icon2,
    MInput: Input,
    MButton: Button,
    MSwitch: Switch,
    MTable: Table,
    DatePicker,
    TimePicker,
    Row,
    MCol: Col,
    MSelect: Select,
    MOption: Option,
    MOptionGroup: OptionGroup,
    Page,
    MForm: Form,
    FormItem: Form.Item,
    InputNumber,
}

export default components;